using BizNepal.Server.Models;
using BizNepal.Server.Models.DTO;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace BizNepal.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UserController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetUsers()
        {
            // Fetch all users from the database
            var users = await _userManager.Users.ToListAsync();

            // Create a list to hold user details along with their roles
            var userList = new List<object>();

            foreach (var user in users)
            {
                // Get the roles for each user
                var roles = await _userManager.GetRolesAsync(user);

                // Create an anonymous object containing user information and roles
                userList.Add(new
                {
                    user.Id,
                    user.UserName,
                    user.Email,
                    Roles = roles // This will be a list of roles
                });
            }

            // Return the list of users with their roles
            return Ok(userList);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<ApplicationUser>> GetUser(Guid id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null)
            {
                return NotFound("No user found.");
            }
            return Ok(user);

        }

        [HttpPost]

        public async Task<ActionResult<ApplicationUser>> CreateUser([FromBody] RegisterRequestDto registerRequestDto)
        {
            if (registerRequestDto == null)
            {
                return BadRequest("Invalid registration request.");
            }

            var existingUserName = await _userManager.FindByNameAsync(registerRequestDto.UserName);

            var existingEmail = await _userManager.FindByEmailAsync(registerRequestDto.Email);

            if (existingUserName != null && existingEmail != null)
            {
                return BadRequest("Username and email are already taken.");
            }

            if (existingUserName != null)
            {
                return BadRequest("A user with the same username already exists.");
            }

            if (existingEmail != null)
            {
                return BadRequest("A user with the same email already exists.");
            }

            var identityUser = new ApplicationUser
            {
                UserName = registerRequestDto.UserName,
                Email = registerRequestDto.Email,
                CreatedAt = DateTime.Now,
            };

            var identityResult = await _userManager.CreateAsync(identityUser, registerRequestDto.Password);

            if (!identityResult.Succeeded)
            {
                return BadRequest(identityResult.Errors);
            }

            if (identityResult.Succeeded)
            {
                if (registerRequestDto.Role != null && registerRequestDto.Role.Any())
                {
                    identityResult = await _userManager.AddToRoleAsync(identityUser, registerRequestDto.Role);

                    if (identityResult.Succeeded)
                    {

                        return Ok(new
                        {

                            message = "Registration Successful! please login",
                            username = identityUser.UserName
                        });

                    }

                }
            }

            return BadRequest("Failed to register user.");


        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateUser(string id, [FromBody] UpdateUserDto updateUserDto)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            user.UserName = updateUserDto.UserName;
            user.Email = updateUserDto.Email;
            

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            // Update user role if provided
            if (!string.IsNullOrEmpty(updateUserDto.Role))
            {
                // Get current roles
                var currentRoles = await _userManager.GetRolesAsync(user);

                // Remove user from current roles
                var removeResult = await _userManager.RemoveFromRolesAsync(user, currentRoles);
                if (!removeResult.Succeeded)
                {
                    return BadRequest(removeResult.Errors);
                }

                // Add user to new role
                var addResult = await _userManager.AddToRoleAsync(user, updateUserDto.Role);
                if (!addResult.Succeeded)
                {
                    return BadRequest(addResult.Errors);
                }
            }

            return Ok("Updated Successfully");
        }

        // DELETE: api/user/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok("Deleted Successfully");
        }
    }
}









