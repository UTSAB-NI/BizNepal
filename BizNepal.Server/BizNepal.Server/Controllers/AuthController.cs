namespace BizNepal.Server.Controllers;

using BizNepal.Server.Models;
using BizNepal.Server.Models.DTO;
using BizNepal.Server.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

/// <summary>
/// Defines the <see cref="AuthController" />
/// </summary>
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

    /// <summary>
    /// The Register
    /// </summary>
    /// <param name="registerRequestDto">The registerRequestDto<see cref="RegisterRequestDto"/></param>
    /// <returns>The <see cref="Task{IActionResult}"/></returns>
    [HttpPost]
    [Route("Register")]
    public async Task<IActionResult> Register(RegisterRequestDto registerRequestDto)
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

    //POST: /api/auth/Login

    /// <summary>
    /// The Login
    /// </summary>
    /// <param name="loginRequestDto">The loginRequestDto<see cref="LoginRequestDto"/></param>
    /// <returns>The <see cref="Task{IActionResult}"/></returns>
    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login(LoginRequestDto loginRequestDto)
    {
        string emailPattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
        bool isEmail = Regex.IsMatch(loginRequestDto.UserIdentifier, emailPattern);

        ApplicationUser user;

        if (isEmail)
        {
            user = await _userManager.FindByEmailAsync(loginRequestDto.UserIdentifier);

        }
        else
        {
            user = await _userManager.FindByNameAsync(loginRequestDto.UserIdentifier);
        }

        //if (user == null)
        //{
        //    return Unauthorized("Invalid login attempt.");
        //}

        Console.WriteLine("testing");

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
                        JwtToken = jwtToken,
                        Role = role
                    };

                    return Ok(response);
                }
            }
        }

        return BadRequest("Username or Password incorrect");
    }
}
