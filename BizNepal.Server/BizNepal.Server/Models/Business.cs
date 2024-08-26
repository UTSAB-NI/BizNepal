using System.ComponentModel.DataAnnotations;

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

        public Guid UserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }

        public Guid LocationId { get; set; }
        public Location Location { get; set; }
    }
}
