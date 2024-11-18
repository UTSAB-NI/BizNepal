using BizNepal.Server.Data;
using BizNepal.Server.Models.DTO;
using BizNepal.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.Diagnostics;

namespace BizNepal.Server.Controllers;

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
        var currentUserEmail= User.FindFirst(ClaimTypes.Email)?.Value;
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        bool userReviewExists = _context.Reviews.Any(c => c.UserId == userId && c.BusinessId==BusinessId);
        if (userReviewExists)
        {
            return BadRequest("One user can have only one review for a business.");
        }

        var review = new Review
        {
            BusinessId = BusinessId,
            UserId = userId,
            Rating = addReviewDto.Rating,
            Comment = addReviewDto.Comment,
            CreatedAt = DateTime.UtcNow,
            CreatedBy = currentUserEmail!
            //ReviewDate = DateTime.UtcNow
        };

        _context.Reviews.Add(review);
        await _context.SaveChangesAsync();

        await UpdateBusinessRating(BusinessId);

        return Ok(review);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var reviews= await _context.Reviews
            .Include(b=>b.Business)
            .ToListAsync();

        return Ok(reviews);
    }


    private async Task UpdateBusinessRating(Guid businessId)
    {
        var reviews = await _context.Reviews
            .Where(r => r.BusinessId == businessId && r.Rating.HasValue)
            .ToListAsync();

        var business = await _context.Businesses.FindAsync(businessId);
        if (business != null)
        {
            business.OverallRating = reviews.Any()
                ? Math.Round((decimal)reviews.Average(r => r.Rating!.Value), 1)
                : 0;

            await _context.SaveChangesAsync();
        }
    }



}
