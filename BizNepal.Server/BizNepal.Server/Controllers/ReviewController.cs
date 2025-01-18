using BizNepal.Server.Data;
using BizNepal.Server.Models.DTO;
using BizNepal.Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using BizNepal.Server.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using BizNepal.Server.Interface;
using Microsoft.AspNetCore.Http.HttpResults;

namespace BizNepal.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ReviewController(ApplicationDbContext context, IMapper mapper, IEmailService emailService) : ControllerBase
{
    private readonly ApplicationDbContext _context = context;
    private readonly IEmailService _emailService = emailService;
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

        
         var business = await _context.Businesses.FindAsync(BusinessId);
        if (business != null)
        {
            string to = $"{business.CreatedBy}"; 
            string subject = "New Review Submitted for Your Business";
            string body = $@"
            <h2>New Review for {business.BusinessName}</h2>
            <p><strong>Rating:</strong> {addReviewDto.Rating}</p>
            <p><strong>Comment:</strong> {addReviewDto.Comment}</p>
            <p><strong>Submitted by:</strong> {currentUserEmail}</p>
            <p>Check it out on your dashboard!</p>
            ";

            await _emailService.SendEmailAsync(to, subject, body);
        }

        return Ok(review);
    }

    #endregion

    [HttpGet("send-mail")]
    public async Task<IActionResult> SendMail()
    {

        string to = "utsabsingh170@gmail.com";
        string subject = "New Review Submitted for Your Business";
        string body = $@"
            <h2>New Review for /h2>
            <p><strong>Rating:</strong> </p>
            <p><strong>Comment:</strong> </p>
            <p><strong>Submitted by:</strong></p>
            <p>Check it out on your dashboard!</p>
            ";
        try
        {
            await _emailService.SendEmailAsync(to, subject, body);
            return Ok("Mail send successfully");

        }
        catch (Exception e)
        {
            return NotFound(e.Message);
        }
    }


    #region GetAll Reiview
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var reviews= await _context.Reviews
            .Include(b=>b.Business)
            .ThenInclude(c=>c.BusinessImages)
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
