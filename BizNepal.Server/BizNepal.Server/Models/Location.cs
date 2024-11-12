using System.ComponentModel.DataAnnotations;

namespace BizNepal.Server.Models;

public class Location
{
    [Key]
    public Guid LocationId { get; set; }
    public string Latitude { get; set; }
    public string Longitude { get; set; }


}
