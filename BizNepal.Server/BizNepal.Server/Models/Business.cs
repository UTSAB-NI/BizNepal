using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BizNepal.Server.Models;

public class Business : AuditModel
{

    [Key]
    public Guid BusinessId { get; set; }

    [Required]
    public string BusinessName { get; set; }

    [Required]
    public string Description { get; set; }

    public string Website { get; set; }

    [Required]
    public string PhoneNumber { get; set; }


    public Guid AddressId { get; set; }
    [ForeignKey("AddressId")]
    public Address Address { get; set; }

    public decimal? OverallRating { get; set; }

    public string UserId { get; set; }
    [ForeignKey("UserId")]
    public ApplicationUser ApplicationUser { get; set; }

    [Required]
    public Guid LocationId { get; set; }
    public Location Location { get; set; }

    [Required]
    public Guid CategoryId { get; set; }
    public Category Category { get; set; }

    [JsonIgnore]
    public ICollection<BusinessImage>? BusinessImages { get; set; }= new List<BusinessImage>();

    [JsonIgnore]
    public ICollection<Review>? Reviews { get; set; } =new List<Review>();


}
