using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BizNepal.Server.Data;
using BizNepal.Server.Models;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using BizNepal.Server.Models.DTO;
using AutoMapper;

namespace BizNepal.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarkController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;



        public BookmarkController(ApplicationDbContext context, UserManager<ApplicationUser> userManager,IMapper mapper)
        {
            _context = context;
            _userManager = userManager;
            _mapper = mapper;
        }

        //// GET: api/Bookmark
        //[HttpGet]
        //public async Task<ActionResult<Bookmark>> GetBookmarks()
        //{
        //    var userId = User?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        //    if (string.IsNullOrEmpty(userId))
        //    {
        //        return Unauthorized("User not authenticated.");
        //    }

        //    var bookmark = await _context.Bookmarks.FindAsync(id);

        //    if (bookmark == null)
        //    {
        //        return NotFound();
        //    }

        //    return bookmark;
        //}

        // GET: api/Bookmark
        [HttpGet]
        public async Task<ActionResult<List<BusinessResponseDto>>> GetBookmarks()
        {
            var userId = User?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User not authenticated.");
            }

            var bookmarks = await _context.Bookmarks
                .Include(c => c.Business)
                    .ThenInclude(b => b.Category)
                .Include(c => c.Business)
                    .ThenInclude(b => b.Address)
                .Include(c => c.Business)
                    .ThenInclude(b => b.BusinessImages)
                .Where(x => x.UserId == userId)
                .Select(c => c.Business)
                .ToListAsync();



            if (bookmarks == null)
            {
                return NotFound();
            }

            var businessDto= _mapper.Map<List<BusinessResponseDto>>(bookmarks);

            return businessDto;
        }



        
        [HttpPost]
        public async Task<ActionResult> AddToBookmark(Guid businessId)
        {
            if (businessId == Guid.Empty)
            {
                return NotFound($"{businessId} not found");
            }

            var userId = User?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            var bookmark = new Bookmark
            {
                UserId=userId,
                BusinnessId= businessId,
                CreatedAt= DateTime.UtcNow,
                CreatedBy=userId
                
            };

           await _context.Bookmarks.AddAsync(bookmark);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Business added to bookmark successfully",
            });


        }

        // DELETE: api/Bookmark/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookmark(Guid id)
        {
            var bookmark = await _context.Bookmarks.FindAsync(id);
            if (bookmark == null)
            {
                return NotFound();
            }

            _context.Bookmarks.Remove(bookmark);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookmarkExists(Guid id)
        {
            return _context.Bookmarks.Any(e => e.Id == id);
        }
    }
}
