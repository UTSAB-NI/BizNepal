using Microsoft.AspNetCore.Connections;
using Microsoft.AspNetCore.Identity;

namespace BizNepal.Server.Models;

public class ApplicationUser:IdentityUser
{
    public DateTime CreatedAt { get; set; }
    public ICollection<Review>? Reviews { get; set; }
    public ICollection<Business> Businesses { get; set; } = new List<Business>();

}
