using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BizNepal.Server.Models.DTO
{
    public class BusinessReviewResponseDto
    {
        
        public Guid BusinessId { get; set; }

        public string BusinessName { get; set; }

        public string Description { get; set; }

        public string Website { get; set; }

        public string PhoneNumber { get; set; }

        public string UserId { get; set; }

        public Guid CategoryId { get; set; }
        
       
    }
}
