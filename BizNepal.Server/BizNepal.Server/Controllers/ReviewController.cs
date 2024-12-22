using BizNepal.Server.Data;
using BizNepal.Server.Models.DTO;
using BizNepal.Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace BizNepal.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ReviewController(ApplicationDbContext context, IMapper mapper) : ControllerBase
{
    private readonly ApplicationDbContext _context = context;
    private readonly IMapper _mapper = mapper;

    #region Create Review
    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromQuery] Guid BusinessId, AddReviewDto addReviewDto)
    {
        var currentUserEmail= User.FindFirst(ClaimTypes.Email)?.Value;
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        bool userReviewExists = await _context.Reviews.AnyAsync(c => c.UserId == userId && c.BusinessId==BusinessId);

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

    #endregion

    #region GetAll Reiview
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var reviews= await _context.Reviews
            .Include(b=>b.Business)
            .OrderByDescending(b=>b.CreatedAt)
            .ToListAsync();

        var reviewResponse =_mapper.Map<List<ReviewReponseDto>>(reviews);

        return Ok(reviewResponse);
    }

    #endregion

    #region Update BusinessRating
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

    #endregion

}
