using System.ComponentModel.DataAnnotations.Schema;

namespace BizNepal.Server.Models
{
    public class Bookmark : AuditModel
    {
        public Guid Id { get; set; }
        
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public ApplicationUser ApplicationUser { get; set; }

        public Guid BusinessId { get; set; }
        [ForeignKey("BusinessId")]
        public Business Business { get; set; }

    }
}
