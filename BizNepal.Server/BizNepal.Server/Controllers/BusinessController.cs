using AutoMapper;
using BizNepal.Server.Data;
using BizNepal.Server.Models;
using BizNepal.Server.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BizNepal.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusinessController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public BusinessController(ApplicationDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
            
        }

        #region Get all Businesses

        [HttpGet(Order =2)]
        public async Task<IActionResult> GetAll()
        {
            var businesses = await _context.Businesses.Include(c => c.Location)
                                                      .Include(c => c.Category)
                                                      .Include(c => c.Reviews)
                                                      .Include(c => c.BusinessImages)
                                                      .ToListAsync();

            var businessDto = _mapper.Map<List<BusinessResponseDto>>(businesses);

            return Ok(businessDto);
        }

        #endregion

        #region Get Business by Id

        [HttpGet("{businessId}", Order = 3)]
        public async Task<IActionResult> GetById(Guid businessId)
        {

            var business = _context.Businesses.Include(b => b.Location)
                                              .Include(b => b.Category)
                                              .Include(c => c.Reviews)
                                              .Include(c => c.BusinessImages)
                                              .First(m => m.BusinessId == businessId);

            var businessDto= _mapper.Map<BusinessResponseDto>(business);


            return Ok(businessDto);
        }

        #endregion

        #region Create Business

        [HttpPost("Create", Order = 4)]
        public async Task<IActionResult> Create(BusinessRequestDto businessDto)
        {
            // Ensure the user is authenticated
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var category = await _context.Categories
                .FirstOrDefaultAsync(c => c.CategoryName == businessDto.CategoryName);

            if (category == null)
            {
                return BadRequest($"Category '{businessDto.CategoryName}' does not exist.");
            }

            // Use a transaction scope to ensure atomicity
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                // Proceed with business creation
                var location = new Location
                {
                    Latitude = businessDto.Latitude,
                    Longitude = businessDto.Longitude
                };

                _context.Locations.Add(location);
                await _context.SaveChangesAsync();

                var business = new Business
                {
                    BusinessName = businessDto.BusinessName,
                    Description = businessDto.Description,
                    Website = businessDto.Website,
                    PhoneNumber = businessDto.PhoneNumber,
                    UserId = userId,
                    LocationId = location.LocationId,
                    CategoryId = category.CategoryId,
                    CreatedAt = DateTime.Now,
                };

                _context.Businesses.Add(business);
                await _context.SaveChangesAsync();

                // Handle image uploads
                if (businessDto.Images != null && businessDto.Images.Count > 0)
                {
                    var imageUploads = new List<BusinessImage>();

                    foreach (var image in businessDto.Images)
                    {

                        if (image.Length > 0)
                        {
                            var businessName = business.BusinessName.ToLower().Replace(" ", "-"); // Normalize business name
                            var timestamp = DateTime.Now.ToString("yyyyMMddHHmmss");
                            var uniqueId = Guid.NewGuid().ToString(); // Unique identifier
                            var extension = Path.GetExtension(image.FileName).ToLower();
                            var fileName = $"{businessName}-{timestamp}-{uniqueId}{extension}";
                            var filePath = Path.Combine("wwwroot/businessImages", fileName);

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

                //var responseDto = _mapper.Map<BusinessResponseDto>(business);


                // Commit the transaction
                await transaction.CommitAsync();

                return Ok(new { message = "Business created successfully" });
 // Return the response DTO

               
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
        public async Task<IActionResult> Update(Guid id,BusinessUpdateDto updateDto)
        {
            // Ensure the user is authenticated
            var claims = User.Claims.ToList();

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

            var location = await _context.Locations.FirstAsync(x => x.LocationId == business.LocationId);

            var category = await _context.Categories
              .FirstOrDefaultAsync(c => c.CategoryId == business.CategoryId);

            business.BusinessName = updateDto.BusinessName;
            business.Description = updateDto.Description;
            business.Website = updateDto.Website;
            business.PhoneNumber = updateDto.PhoneNumber;
            business.UpdatedAt=DateTime.Now;

            location.Latitude = updateDto.Latitude;
            location.Longitude = updateDto.Longitude;

            category.CategoryName = updateDto.CategoryName;

            


            await _context.SaveChangesAsync();


            return Ok(business);
        }

        #endregion

        #region Delete Business

        [HttpDelete(Order = 6)]
        public async Task<IActionResult> Delete([FromQuery] Guid id)
        {
            var business = await _context.Businesses.FindAsync(id);

            if (business == null)
            {
                return NotFound("Business not found");
            }

            _context.Businesses.Remove(business);
            await _context.SaveChangesAsync();

            return Ok("Deleted Successfully");

        }

        #endregion

        #region List Business by Category

        [HttpGet("searchByCategory")]
        public async Task<IActionResult> GetBusinessByCategory([FromQuery] string category)
        {
            var businesses = await _context.Businesses.Include(b => b.Category)
                                                    .Include(b => b.Location)
                                                    .Include(b => b.BusinessImages)
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

            var suggestions = _context.Businesses // or any entity you're searching
                .Where(b => b.BusinessName.Contains(query)) // Change to match your requirements
                .Select(b => b.BusinessName)                // Returning names for simplicity
                .Take(10)                           // Limit suggestions for performance
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




    }
}
