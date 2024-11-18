using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BizNepal.Server.Models;

public class Review : AuditModel
{
    public Guid ReviewId { get; set; }
    public string Comment { get; set; }

    [Range(1,5,ErrorMessage ="Rating should be between 1-5")]
    public int? Rating { get; set; }  // Individual customer rating

    public Guid BusinessId { get; set; }
    
    public Business Business { get; set; }

    public string UserId { get; set; }
    [JsonIgnore]
    public ApplicationUser ApplicationUser { get; set; }

}
