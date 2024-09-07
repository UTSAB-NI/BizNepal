using Microsoft.AspNetCore.Connections;
using Microsoft.AspNetCore.Identity;

namespace BizNepal.Server.Models
{
    public class ApplicationUser:IdentityUser
    {
        
        public ICollection<Review>? Reviews { get; set; } 

    }
}
