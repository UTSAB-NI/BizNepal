using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BizNepal.Server.Models
{
    public class BusinessImage
    {
        [Key]
        public Guid ImageId { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        public Guid BusinessId { get; set; }

        
    }
}
