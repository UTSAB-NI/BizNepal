using AutoMapper;
using BizNepal.Server.Data;
using BizNepal.Server.Models;
using BizNepal.Server.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Xml.Linq;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace BizNepal.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BusinessController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly HttpClient _httpClient;

    public BusinessController(ApplicationDbContext context, IMapper mapper, HttpClient httpClient)
    {
        _mapper = mapper;
        _context = context;
        _httpClient = httpClient;
    }

    #region Get all Businesses

    [HttpGet(Order =2)]
    public async Task<ActionResult<PaginatedResponse<BusinessResponseDto>>> GetAll(int pageSize = 50,
                                       string? searchTerm = null,
                                       string? category = null,
                                       int pageNumber = 1,
                                       string? sortColumn = null,
                                       bool isAscending = true)
    {
        // searchTerm to lower case
        var searchTermToLower = searchTerm?.Trim().ToLower();

        var businesses =  _context.Businesses.Include(c => c.Location)
                                                  .Include(c => c.Category)
                                                  .Include(c => c.Reviews)
                                                  .Include(c => c.BusinessImages)
                                                  .Include(b => b.Address)
                                                  .AsQueryable();

        // filtering based on category if category is passed to api
        if (!string.IsNullOrWhiteSpace(category))
        {

            businesses = businesses.Where(b => b.Category.CategoryName.ToLower()==category.ToLower());
        }

        // search based no businessname if businessName is passed to api
        if (!string.IsNullOrWhiteSpace(searchTermToLower))
        {

            businesses = businesses.Where(b => b.BusinessName.ToLower().Contains(searchTermToLower)); 
        }

        //sorting based on passed column of business table
        if (!string.IsNullOrEmpty(sortColumn))
        {
            var sorting = isAscending ? "ascending" : "descending";

            var businessProperty = typeof(Business).GetProperty(sortColumn);

            if (businessProperty != null && businessProperty.PropertyType == typeof(string))
            {
                businesses = businesses.OrderBy($"{sortColumn}.ToLower() {sorting}");
            }
            else
            {
                businesses = businesses.OrderBy($"{sortColumn} {sorting}");
            }
        }

        // Execute the query to count total business
        var businessCount = await businesses.CountAsync();
        
        var totalPages = (int)Math.Ceiling(businessCount / (double)pageSize);

        var paginatedBook = await businesses.Skip((pageNumber - 1) * pageSize)
                                     .Take(pageSize)
                                     .ToListAsync();

        var businessResponseList = _mapper.Map<List<BusinessResponseDto>>(paginatedBook);

        //return Ok(businessResponseList);
        var result = new PaginatedResponse<BusinessResponseDto>
        {
            TotalCount = businessCount,
            TotalPage = totalPages,
            Items = businessResponseList
        };

        return Ok(result);
    }

    #endregion

    #region Get Business by Id

    [HttpGet("{businessId}", Order = 3)]
    public async Task<IActionResult> GetById(Guid businessId)
    {
        if (businessId == Guid.Empty)
        {
            return NotFound($"{businessId} not found");
        }

        var business = await _context.Businesses
        .Include(b => b.Location)
        .Include(b => b.Category)
        .Include(c => c.Reviews)
        .Include(c => c.Address)
        .Include(c => c.BusinessImages)
        .Include(c => c.PageVisits)
        .FirstOrDefaultAsync(m => m.BusinessId == businessId);

        if (business == null)
        {
            return NotFound("No business found");
        }

        // Track the visit
        var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();
        var userAgent = HttpContext.Request.Headers["User-Agent"].ToString();

        //// Check if the same IP visited this business within the last 24 hours
        //var lastDayVisit = await _context.PageVisits
        //    .Where(v => v.BusinessId == businessId &&
        //           v.VisitorIp == ipAddress &&
        //           v.VisitDateTime > DateTime.UtcNow.AddHours(-24))
        //    .FirstOrDefaultAsync();

        //if (lastDayVisit == null)
        //{
            // Insert new visit record
            var visit = new PageVisit
            {
                BusinessId = businessId,
                VisitorIp = ipAddress,
                VisitDateTime = DateTime.UtcNow,
                UserAgent=userAgent
                
            };

            _context.PageVisits.Add(visit);

            // Increment the TotalVisits count for the business
            business.TotalVisits++;

            await _context.SaveChangesAsync();
        //}

        var businessDto = _mapper.Map<BusinessResponseDto>(business);

        return Ok(businessDto);

    }

    #endregion

    #region Create Business

    [HttpPost("Create", Order = 4)]
    public async Task<IActionResult> Create([FromForm] CreateBusinessDto input)
    {
        // Ensure the user is authenticated
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var email = User.FindFirst(ClaimTypes.Email)?.Value;

        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized("Please login first");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        bool categoryExists = await _context.Categories.AnyAsync(c => c.CategoryId == input.CategoryId);

        if (!categoryExists)
        {
            return BadRequest(new { message = "Category doesnt exists" });
        }

        bool businessExists = await _context.Businesses.AnyAsync(c => c.BusinessName.ToLower() == input.BusinessName.ToLower());

        if (businessExists)
        {
            return BadRequest(new { message = "Business Name already exist" });
        }

        // Use a transaction scope to ensure atomicity
        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            // Proceed with business creation
            var location = new Location
            {
                Latitude = input.Latitude,
                Longitude = input.Longitude
            };

            _context.Locations.Add(location);
            await _context.SaveChangesAsync();

            var address = new Address
            {
                City = input.City,
                District = input.District,
            };

            _context.Addresses.Add(address);
            await _context.SaveChangesAsync();

            var business = new Business
            {
                BusinessName = input.BusinessName,
                Description = input.Description,
                Website = input.Website!,
                PhoneNumber = input.PhoneNumber,
                UserId = userId,
                LocationId = location.LocationId,
                CategoryId = input.CategoryId,
                AddressId = address.AddressId,
                CreatedAt = DateTime.Now,
                CreatedBy = email!
            };

            _context.Businesses.Add(business);
            await _context.SaveChangesAsync();

            // Handle image uploads
            if (input.Images != null && input.Images.Count > 0)
            {
                var imageUploads = new List<BusinessImage>();

                foreach (var image in input.Images)
                {

                    if (image.Length > 0)
                    {
                        var businessName = business.BusinessName.ToLower().Replace(" ", "-"); // Normalize business name
                        var timestamp = DateTime.Now.ToString("yyyyMMddHHmmss");
                        var uniqueId = Guid.NewGuid().ToString(); // Unique identifier
                        var extension = Path.GetExtension(image.FileName).ToLower();
                        var fileName = $"{businessName}-{timestamp}-{uniqueId}{extension}";
                        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "businessImages", fileName);

                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await image.CopyToAsync(stream);
                        }

                        // Create BusinessImage object
                        var businessImage = new BusinessImage
                        {
                            ImageUrl = $"/businessImages/{fileName}", // Adjust URL based on how you store the images
                            BusinessId = business.BusinessId
                        };

                        imageUploads.Add(businessImage);
                    }
                }

                // Add the images to the database
                if (imageUploads.Count > 0)
                {
                    _context.BusinessImages.AddRange(imageUploads);
                    await _context.SaveChangesAsync();
                }
            }

            // Commit the transaction
            await transaction.CommitAsync();

            return Ok(new { message = "Business created successfully",
            });

           
        }
        catch (Exception ex)
        {
            // Rollback the transaction in case of an error
            await transaction.RollbackAsync();
            // Log the error (optional)
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    #endregion

    #region Update Business

    [HttpPut("{id}", Order = 5)]
    public async Task<IActionResult> Update(Guid id,[FromBody] UpdateBusinessDto input)
  {

        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        var business = await _context.Businesses.FindAsync(id);

        if(business == null)
        {
            return NotFound();
        }


        business.BusinessName = input.BusinessName;
        business.Description = input.Description;
        business.Website = input.Website;
        business.PhoneNumber = input.PhoneNumber;
        business.UpdatedAt=DateTime.Now;
        business.CategoryId=input.CategoryId;



        await _context.SaveChangesAsync();


        return Ok(business);
    }

    #endregion

    #region Delete Business

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            var business = await _context.Businesses
                .Include(b => b.BusinessImages)
                .Include(b => b.Location)
                .FirstOrDefaultAsync(b => b.BusinessId == id);

            if (business == null)
            {
                return NotFound("Business not found");
            }

            // Delete image files from wwwroot
            if (business.BusinessImages != null && business.BusinessImages.Count > 0)
            {
                foreach (var image in business.BusinessImages)
                {
                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", image.ImageUrl.TrimStart('/'));
                    if (System.IO.File.Exists(filePath))
                    {
                        System.IO.File.Delete(filePath);
                    }
                }
            }

            // Get the location ID before removing the business
            var locationId = business.LocationId;

            // Remove the business and its images
            _context.Businesses.Remove(business);
            await _context.SaveChangesAsync();

            // Explicitly remove the location if it still exists
            var location = await _context.Locations.FindAsync(locationId);
            if (location != null)
            {
                _context.Locations.Remove(location);
                await _context.SaveChangesAsync();
            }

            // Get the location ID before removing the business
            var addressId = business.AddressId;

            

            // Explicitly remove the location if it still exists
            var address = await _context.Addresses.FindAsync(addressId);
            if (address != null)
            {
                _context.Addresses.Remove(address);
                await _context.SaveChangesAsync();
            }

            await transaction.CommitAsync();

            return Ok(new { message = "Business, location, and associated images deleted successfully" });
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    #endregion

    #region  Business by Category

    [HttpGet("searchByCategory")]
    public async Task<IActionResult> GetBusinessByCategory([FromQuery] string category)
    {
        var businesses = await _context.Businesses.Include(b => b.Category)
                                                .Include(b => b.Location)
                                                .Include(b => b.BusinessImages)
                                                .Include(b=>b.Reviews)
                                                .Include(b => b.Address)
                                                .Where(b => b.Category.CategoryName == category)
                                                .ToListAsync();
        if (businesses == null)
        {
            return NotFound();
        }

        var responseDto= _mapper.Map<List<BusinessResponseDto>>(businesses);

        return Ok(responseDto);
    }

    #endregion

    #region Search business

    [HttpGet("search")]
    public async Task<IActionResult> SearchByName([FromQuery] string keyword)
    {
        // Check if keyword is provided
        if (string.IsNullOrEmpty(keyword))
        {
            return BadRequest("Search keyword is required.");
        }
        
        var businesses = await _context.Businesses
            .Include(b => b.Category)
            .Include(b => b.Location)
            .Include(b => b.BusinessImages)
            .Include(b => b.Reviews)
            .Include(b => b.Address)
            .Where(b => b.BusinessName.Contains(keyword))
            .ToListAsync();


        var responseDto = _mapper.Map<List<BusinessResponseDto>>(businesses);

        return Ok(responseDto);
    }

    #endregion

    #region Suggestion for search

    [HttpGet("suggestions")]
    public IActionResult GetSuggestions([FromQuery] string query)
    {
        if (string.IsNullOrEmpty(query))
        {
            return BadRequest("Query cannot be empty.");
        }

        var suggestions = _context.Businesses 
            .Where(b => b.BusinessName.ToLower().Contains(query.ToLower())) 
            .Select(b => b.BusinessName)                
            .Take(10)                           
            .ToList();

        return Ok(suggestions);
    }

    #endregion

    #region Upload images For business

    [HttpPost("upload-images")]
    public async Task<IActionResult> UploadImages(Guid id, [FromForm] BusinessImagesUploadDto uploadDto)
    {
        // Ensure the user is authenticated
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        // Find the business by ID
        var business = await _context.Businesses.FindAsync(id);
        if (business == null)
        {
            return NotFound("Business not found.");
        }

        // Check if there are any images to upload
        if (uploadDto.Images == null || uploadDto.Images.Count == 0)
        {
            return BadRequest("No images provided for upload.");
        }

        var imageUploads = new List<BusinessImage>();

        foreach (var image in uploadDto.Images)
        {
            // Check if the image file is valid
            if (image.Length > 0)
            {
                // Define the file name and path
                var businessName = business.BusinessName.ToLower().Replace(" ", "-"); // Normalize business name
                var timestamp = DateTime.Now.ToString("yyyyMMddHHmmss");
                var uniqueId = Guid.NewGuid().ToString(); // Unique identifier
                var extension = Path.GetExtension(image.FileName).ToLower();
                var fileName = $"{businessName}-{timestamp}-{uniqueId}{extension}";

                var filePath = Path.Combine("wwwroot/businessImages", fileName);

                // Save the image to the file system
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }

                // Create BusinessImage object
                var businessImage = new BusinessImage
                {
                    ImageUrl = $"/businessImages/{fileName}", // Adjust URL based on how you store the images
                    BusinessId = business.BusinessId
                };

                imageUploads.Add(businessImage);
            }
        }

        // Add the images to the database
        if (imageUploads.Count > 0)
        {
            _context.BusinessImages.AddRange(imageUploads);
            await _context.SaveChangesAsync();
        }

        return Ok(new { message = "Images uploaded successfully.", uploadedImages = imageUploads.Select(img => img.ImageUrl) });
    }

    #endregion

    #region Delete business image

    [HttpDelete("delete-Image")]
    public async Task<IActionResult> DeleteImage(Guid id)
    {
        var businessImage = await _context.BusinessImages.FindAsync(id);

        if (businessImage == null)
        {
            return NotFound();
        }

        // Delete the file from the file system
        var filePath = Path.Combine("wwwroot", businessImage.ImageUrl.TrimStart('/'));
        if (System.IO.File.Exists(filePath))
        {
            System.IO.File.Delete(filePath);
        }

        // Remove the image record from the database
        _context.BusinessImages.Remove(businessImage);
        await _context.SaveChangesAsync();

        return Ok("Deleted successfully");
    }

    #endregion

    [HttpPost("predict")]
    public async Task<IActionResult> PredictOverallSentiment(Guid businessId)
    {
        var url = "http://localhost:8000/predict-sentiment";

        var reviews = await _context.Reviews.Where(c => c.BusinessId == businessId)
            .Select(x => x.Comment)
            .ToListAsync();

        if(reviews.Count == 0)
        {
            return NotFound(new
            {
                message="No review for the business!"
            });
        }

        var reviewInput = new { reviews = reviews };

        var content = new StringContent(JsonSerializer.Serialize(reviewInput), Encoding.UTF8, "application/json");

        try
        {
            var response = await _httpClient.PostAsync(url, content);

            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                var predictionResponse = JsonSerializer.Deserialize<PredictionResponseDto>(responseContent);

                return Ok(predictionResponse);
            }
            else
            {
                return StatusCode((int)response.StatusCode, "Error calling FastAPI endpoint");
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }

    }

    [HttpGet("user/{userId}")]
    public async Task<ActionResult<BusinessResponseDto>> GetBusinessByUser(string userId)
    {
        if (string.IsNullOrWhiteSpace(userId))
        {
            return BadRequest("Please provide userid!");
        }

        var business=await _context.Businesses
            .Where(c=>c.UserId==userId)
            .Include(b => b.Location)
            .Include(b => b.Category)
            .Include(c => c.Reviews)
            .Include(c => c.Address)
            .Include(c => c.BusinessImages)
            .ToListAsync();

        if (business == null)
        {
            return NotFound($"Business with given userid {userId} not found.");
        }

        var businessDto = _mapper.Map<List<BusinessResponseDto>>(business);

        return Ok(businessDto);

    }

    [HttpGet("{businessId}/analytics")]
    public async Task<IActionResult> GetBusinessAnalytics(Guid businessId)
    {
        if (businessId == Guid.Empty)
        {
            return BadRequest("Invalid business ID.");
        }

        var analytics = new
        {
            TotalVisits = await _context.PageVisits.CountAsync(v => v.BusinessId == businessId),
            UniqueVisitors = await _context.PageVisits
                .Where(v => v.BusinessId == businessId)
                .Select(v => v.VisitorIp)
                .Distinct()
                .CountAsync(),
            TodayVisits = await _context.PageVisits
                .Where(v => v.BusinessId == businessId && v.VisitDateTime.Date == DateTime.UtcNow.Date)
                .CountAsync(),
            VisitsByDate = await _context.PageVisits
                .Where(v => v.BusinessId == businessId)
                .GroupBy(v => v.VisitDateTime.Date)
                .Select(g => new { Date = g.Key, Count = g.Count() })
                .ToListAsync(),
            VisitorsLast24Hours = await _context.PageVisits
                .Where(v => v.BusinessId == businessId && v.VisitDateTime > DateTime.UtcNow.AddHours(-24))
                .CountAsync(),
            DeviceStats = await _context.PageVisits
                .Where(v => v.BusinessId == businessId)
                .GroupBy(v => v.UserAgent)
                .Select(g => new { UserAgent = g.Key, Count = g.Count() })
                .OrderByDescending(x => x.Count)
                .ToListAsync()
        };

        return Ok(analytics);
    }

}
