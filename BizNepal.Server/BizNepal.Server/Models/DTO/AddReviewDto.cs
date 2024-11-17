using System.ComponentModel.DataAnnotations;

namespace BizNepal.Server.Models.DTO;

public class AddReviewDto
{
    [Required]
    public string Comment { get; set; }

    [Range(1, 5, ErrorMessage = "Rating should be between 1-5")]
    public int? Rating { get; set; }

}
