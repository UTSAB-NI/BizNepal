using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BizNepal.Server.Models
{
    public class Business
    {
        [Key]
        public Guid BusinessId { get; set; }

        public string BusinessName { get; set; }

        public string Description { get; set; }

        public string Website { get; set; }

        public string PhoneNumber { get; set; } 

        public string? Address { get; set; }

        public decimal? OverallRating { get; set; }

        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public ApplicationUser ApplicationUser { get; set; }

        public Guid LocationId { get; set; }
        public Location Location { get; set; }

        public Guid CategoryId { get; set; }
        public Category Category { get; set; }

        [JsonIgnore]
        public ICollection<BusinessImage>? BusinessImages { get; set; }= new List<BusinessImage>();

        public ICollection<Review>? Reviews { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }




    }
}
