using System.ComponentModel.DataAnnotations;

namespace BizNepal.Server.Models.DTO;

public class CreateCategoryDto
{
    [Required]
    public string CategoryName { get; set; }

    [Required]
    public IFormFile IconImage { get; set; }
}
