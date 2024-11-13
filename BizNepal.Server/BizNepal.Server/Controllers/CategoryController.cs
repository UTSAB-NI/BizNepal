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
using AutoMapper;

namespace BizNepal.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoryController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly IWebHostEnvironment _webHostEnvironment;

    public CategoryController(ApplicationDbContext context, IMapper mapper, IWebHostEnvironment webHostEnvironment = null)
    {
        _context = context;
        _mapper = mapper;
        _webHostEnvironment = webHostEnvironment;
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
    public async Task<IActionResult> PutCategory(Guid id, [FromForm] UpdateCategoryDto updateCategoryDto)
    {
        // Find the existing category
        var category = await _context.Categories.FindAsync(id);
        if (category == null)
        {
            return NotFound(); // Return 404 if the category doesn't exist
        }

        // Update the existing category properties
        if (!string.IsNullOrEmpty(updateCategoryDto.CategoryName))
        {
            category.CategoryName = updateCategoryDto.CategoryName;

        }

        // Handle book cover page upload
        if (updateCategoryDto.IconImage != null)
        {
            // Path to store images
            var uploadFolder = Path.Combine(_webHostEnvironment.WebRootPath, "icons/category");
            Directory.CreateDirectory(uploadFolder);
            string categoryName = category.CategoryName.Replace(" ", "");
            // Generate unique file name
            var uniqueFileName = Guid.NewGuid().ToString() + "_" + categoryName + Path.GetExtension(updateCategoryDto.IconImage.FileName);
            var filePath = Path.Combine(uploadFolder, uniqueFileName);

            // Check if there's an existing image and delete it
            if (!string.IsNullOrEmpty(category.IconPath))
            {
                var oldImagePath = Path.Combine(_webHostEnvironment.WebRootPath, category.IconPath.TrimStart('/'));
                // Check if the old file exists, and if it does, delete it
                if (System.IO.File.Exists(oldImagePath))
                {
                    System.IO.File.Delete(oldImagePath);
                }
            }

            // Save the new image to the server
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await updateCategoryDto.IconImage.CopyToAsync(fileStream);
            }

            // Update the category with the new image path
            category.IconPath = $"/icons/category/{uniqueFileName}";
        }

        // Save the changes to the database
        await _context.SaveChangesAsync();
        return Ok("Updated Category successfully");
    }

    // POST: api/Category
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult> AddCategory([FromForm] AddCategoryDto addCategoryDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var category = _mapper.Map<Category>(addCategoryDto);

        //handle book conver page upload
        if (addCategoryDto.IconImage != null && addCategoryDto.IconImage.Length > 0)
        {
            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/icons/category");
            Directory.CreateDirectory(uploadFolder);

            string categoryName = addCategoryDto.CategoryName.Replace(" ", "");

            var uniqueFileName = Guid.NewGuid().ToString() + "_" + categoryName + Path.GetExtension(addCategoryDto.IconImage.FileName);
            var filePath = Path.Combine(uploadFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await addCategoryDto.IconImage.CopyToAsync(fileStream);
            }

            category.IconPath = $"/icons/category/{uniqueFileName}";

        }


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
