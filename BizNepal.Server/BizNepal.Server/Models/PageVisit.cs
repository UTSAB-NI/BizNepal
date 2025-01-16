using System.ComponentModel.DataAnnotations;

namespace BizNepal.Server.Models
{
    public class PageVisit
    {
        public Guid Id { get; set; }
        [Required]
        public Guid BusinessId { get; set; }
        public string VisitorIp { get; set; }
        public string UserAgent { get; set; }
        [Required]
        public DateTime VisitDateTime { get; set; }

        public Business Business { get; set; }
    }
}
