using AutoMapper;
using BizNepal.Server.Data;
using BizNepal.Server.Models;
using BizNepal.Server.Models.DTO;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BizNepal.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;

        public AccountController( UserManager<ApplicationUser> userManager,ApplicationDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
            _userManager = userManager;
            
        }

        [HttpPost("update-password")]
        public async Task<ActionResult> UpdatePassword([FromBody] UpdatePasswordDto? input)
        {
            if (input == null)
            {
                return BadRequest("Request body is missing or invalid.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId= User?.Claims.FirstOrDefault(c=>c.Type==ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User not authenticated.");
            }

            var user= await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            var result = await _userManager.ChangePasswordAsync(user,input.CurrentPassword,input.NewPassword);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors.Select(e => e.Description));
            }

            return Ok(new
            {
                message = "Password updated successfully",
            });

        }

        [HttpPatch("update-profile")]
        public async Task<ActionResult> UpdateProfile([FromBody] UpdateProfileDto? input)
        {
            if (input == null)
            {
                return BadRequest("Request body is missing or invalid.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User not authenticated.");
            }

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            var errorMessages = new List<string>();

            // Check if the email is already taken by another user
            if (!string.IsNullOrEmpty(input.Email) && input.Email != user.Email)
            {
                var existingUserWithEmail = await _userManager.FindByEmailAsync(input.Email);
                if (existingUserWithEmail != null)
                {
                    errorMessages.Add("Email is already taken.");
                }
            }

            // Check if the username is already taken by another user
            if (!string.IsNullOrEmpty(input.Username) && input.Username != user.UserName.ToLower())
            {
                var existingUserWithUsername = await _userManager.FindByNameAsync(input.Username);
                if (existingUserWithUsername != null)
                {
                    errorMessages.Add("Username is already taken.");
                }
            }

            // If there are any errors, return a BadRequest with the list of errors
            if (errorMessages.Any())
            {
                return BadRequest(string.Join(" ", errorMessages));
            }

            // Update user's profile fields
            user.UserName = input.Username ?? user.UserName;
            user.PhoneNumber = input.PhoneNumber ?? user.PhoneNumber;
            user.Email = input.Email ?? user.Email;

            // Update the user in the database
            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors.Select(e => e.Description));
            }

            return Ok(new
            {
                message = "Profile updated successfully."
            });
        }


    }
}
