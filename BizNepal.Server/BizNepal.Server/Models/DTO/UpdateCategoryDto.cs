using System.ComponentModel.DataAnnotations;

namespace BizNepal.Server.Models.DTO;

public class UpdateCategoryDto
{
    
    public string? CategoryName { get; set; }
    
    public IFormFile? IconImage { get; set; }
}
