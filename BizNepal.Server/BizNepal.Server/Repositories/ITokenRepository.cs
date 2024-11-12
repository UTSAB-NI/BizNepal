using Microsoft.AspNetCore.Identity;

namespace BizNepal.Server.Repositories;

public interface ITokenRepository
{
   string CreateJWTToken(IdentityUser user, string role);
}
