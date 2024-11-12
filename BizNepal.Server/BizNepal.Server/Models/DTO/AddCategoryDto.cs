using System.ComponentModel.DataAnnotations;

namespace BizNepal.Server.Models.DTO;

public class AddCategoryDto
{
    [Required]
    public string CategoryName { get; set; }

    [Required]
    public IFormFile IconImage { get; set; }
}
