using BizNepal.Server.Data;
using BizNepal.Server.Models;
using BizNepal.Server.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
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

        [HttpGet("test")]

        public IActionResult Index()
        {



            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return Ok(userId);

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
                LocationId = location.LocationId
            };

            _context.Businesses.Add(business);
            await _context.SaveChangesAsync();

            return Ok(business);


        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var businesses = await _context.Businesses.Include(b => b.Location).ToListAsync();
            return Ok(businesses);

        }


        [HttpGet("id")]
        public async Task<IActionResult> GetById(Guid businessId) {

            var business = _context.Businesses.Include(b => b.Location).First(m=>m.BusinessId==businessId);
            return Ok(business);

        }
     

       }
}
