using System.ComponentModel.DataAnnotations;

namespace BizNepal.Server.Models.DTO
{
    public class ReviewReponseDto
    {
        public Guid ReviewId { get; set; }

        public string Comment { get; set; }

        public int? Rating { get; set; }  

        public Guid BusinessId { get; set; }

        public BusinessReviewResponseDto Business { get; set; }

        public string UserId { get; set; }

        public DateTime CreatedAt { get; set; }
        
    }
}
