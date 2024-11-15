using NuGet.Protocol.Plugins;
using System.ComponentModel.DataAnnotations;

namespace BizNepal.Server.Models.DTO;

public class CreateBusinessDto
{
    [Required]
    public string BusinessName { get; set; }
    [Required]
    public string Description { get; set; }

    public string? Website { get; set; }

    [MaxLength(10,ErrorMessage ="Phone Number must be 10 digit long")]
    public string PhoneNumber { get; set; }

    [Required]
    public string Latitude { get; set; }

    [Required]
    public string Longitude { get; set; }

    [Required]
    public Guid CategoryId { get; set; }

    public List<IFormFile>? Images { get; set; }
}
