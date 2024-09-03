﻿using BizNepal.Server.Data;
using BizNepal.Server.Models;
using BizNepal.Server.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text.Json.Serialization;
using System.Text.Json;

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

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var businesses = await _context.Businesses.Include(b => b.Location).Include(c => c.Reviews).ToListAsync();

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


    }
}
