using System.ComponentModel.DataAnnotations;

namespace BizNepal.Server.Models;

public class Location
{
    [Key]
    public Guid LocationId { get; set; }
    [Required]
    public string Latitude { get; set; }
    [Required]
    public string Longitude { get; set; }

}
