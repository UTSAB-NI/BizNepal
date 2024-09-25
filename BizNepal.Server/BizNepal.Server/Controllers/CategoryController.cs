using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BizNepal.Server.Data;
using BizNepal.Server.Models;
using BizNepal.Server.Models.DTO;

namespace BizNepal.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Category
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            return await _context.Categories.ToListAsync();
        }

        // GET: api/Category/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(Guid id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        // PUT: api/Category/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(Guid id, [FromBody] UpdateCategoryDto updateCategoryDto)
        {
            // Find the existing category
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound(); // Return 404 if the category doesn't exist
            }

            // Update the existing category properties
            category.CategoryName = updateCategoryDto.CategoryName;
            // Update other properties as needed from the DTO

            // Save the changes to the database
            await _context.SaveChangesAsync();

            return Ok("Updated Category successfully");
        }

        // POST: api/Category
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult> AddCategory(AddCategoryDto addCategoryDto)
        {
            var category = new Category
            {
                CategoryName = addCategoryDto.CategoryName
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return Ok("Created Category successfully");
        }

        // DELETE: api/Category/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(Guid id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return Ok("Deleted");
        }

        private bool CategoryExists(Guid id)
        {
            return _context.Categories.Any(e => e.CategoryId == id);
        }
    }
}
