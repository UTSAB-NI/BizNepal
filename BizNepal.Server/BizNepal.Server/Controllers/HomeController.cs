using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BizNepal.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class HomeController : ControllerBase
{
 
  [HttpGet("test")]

  public IActionResult Index()
    {
        return Ok("Welcome to BizNepal API!");

    }
}
