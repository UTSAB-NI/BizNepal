using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using BizNepal.Server.Models;
using BizNepal.Server.Models.DTO;
using BizNepal.Server.Repositories;
using System.Data;

namespace BizNepal.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ITokenRepository _tokenRepository;

        public AuthController(UserManager<ApplicationUser> userManager, ITokenRepository tokenRepository)
        {
            _userManager = userManager;
            _tokenRepository = tokenRepository;
        }


        //POST: /api/auth/Register
        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(RegisterRequestDto registerRequestDto)
        {

            var identityUser = new ApplicationUser
            {
                UserName = registerRequestDto.UserName,
                Email = registerRequestDto.UserName
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

                        return Ok("Registration Successful! Please login");

                    }

                }

            }
            return BadRequest("Something went wrong!!");

        }


        //POST: /api/auth/Login
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginRequestDto loginRequestDto)
        {
            var user = await _userManager.FindByEmailAsync(loginRequestDto.UserName);
            if (user != null)
            {
                var checkPassword = await _userManager.CheckPasswordAsync(user, loginRequestDto.Password);

                if (checkPassword)
                {
                    //get roles for user

                    var roles = await _userManager.GetRolesAsync(user);
                    var role = roles.FirstOrDefault();
                    if (role != null)
                    {
                        //Create JWT token
                        var jwtToken = _tokenRepository.CreateJWTToken(user, role);

                        var response = new LoginResponseDto
                        {
                            JwtToken = jwtToken
                        };

                        return Ok(response);
                    }
                }
            }

            return BadRequest("Username or Password incorrect");

        }
    }
}
