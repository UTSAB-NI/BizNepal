using BizNepal.Server.Data;
using BizNepal.Server.Models.DTO;
using BizNepal.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BizNepal.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {


        private readonly ApplicationDbContext _context;
        public ReviewController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromQuery] Guid BusinessId, AddReviewDto addReviewDto)
        {
            var claims = User.Claims.ToList();


           
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var review = new Review
            {
                BusinessId = BusinessId,
                UserId = userId,
                //Rating = reviewDto.Rating,
                Comment = addReviewDto.Comment,
                //ReviewDate = DateTime.UtcNow
            };

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            return Ok(review);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var reviews= _context.Reviews.ToList();
            return Ok(reviews);
        }
    }
}
