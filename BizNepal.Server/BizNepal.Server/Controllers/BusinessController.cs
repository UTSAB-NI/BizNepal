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
        public BusinessController(ApplicationDbContext context)
        {

            _context = context;
            
        }

    

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var businesses = await _context.Businesses.Include(b => b.Location).Include(b=>b.Category).Include(c => c.Reviews).ToListAsync();

            var businessDto = businesses.Select(b => new BusinessResponseDto
            {
                BusinessId = b.BusinessId,
                BusinessName = b.BusinessName,
                Description = b.Description,
                Website = b.Website,
                PhoneNumber = b.PhoneNumber,
                UserId = b.UserId,
                Location = new Location
                {
                    LocationId = b.Location.LocationId,
                    Latitude = b.Location.Latitude,
                    Longitude = b.Location.Longitude
                },

                Category = new Category
                {
                    CategoryId = b.CategoryId,
                    CategoryName = b.Category.CategoryName
                },

                Reviews = b.Reviews.Select(r => new Review
                {
                    ReviewId = r.ReviewId,
                    Comment = r.Comment,
                    BusinessId = r.BusinessId,
                    UserId = r.UserId,
                    // Any other properties from Review can be included here
                }).ToList()
            }).ToList();



            return Ok(businessDto);
        }

        [HttpGet("id")]
        public async Task<IActionResult> GetById(Guid businessId)
        {

            var business = _context.Businesses.Include(b => b.Location).First(m => m.BusinessId == businessId);
            return Ok(business);

        }



        [HttpPost("Create")]
        public async Task<IActionResult> Create(BusinessRequestDto businessDto)
        {
            // Ensure the user is authenticated

            var claims = User.Claims.ToList();


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
                CategoryId = category.CategoryId
            };

            _context.Businesses.Add(business);
            await _context.SaveChangesAsync();

            return Ok(business);
        }

        [HttpPut("{id}")]
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
            location.Latitude = updateDto.Latitude;
            location.Longitude = updateDto.Longitude;
            category.CategoryName = updateDto.CategoryName;




            _context.Businesses.Update(business);
            await _context.SaveChangesAsync();


            return Ok(business);
        }


        [HttpGet("searchByCategory")]
        public async Task<IActionResult> GetBusinessByCategory([FromQuery] string category)
        {
            var business = await _context.Businesses.Include(b => b.Category).Include(b => b.Location).Where(b=>b.Category.CategoryName == category).ToListAsync();
            if (business == null)
            {
                return NotFound();
            }
            return Ok(business);
        }

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
                .Where(b => b.BusinessName.Contains(keyword))
                .ToListAsync();

            // Return not found if no businesses are matched
            if (!businesses.Any())
            {
                return NotFound($"No businesses found containing '{keyword}'");
            }

            return Ok(businesses);
        }

        //[HttpPut]
        //public async Task<IActionResult> Update(BusinessRequestDto businessDto)
        //{



        //}

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


        [HttpDelete]
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

        }
}
