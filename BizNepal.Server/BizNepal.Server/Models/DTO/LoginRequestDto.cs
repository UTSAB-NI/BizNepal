using System.ComponentModel.DataAnnotations;

namespace BizNepal.Server.Models.DTO;

public class LoginRequestDto
{
    [Required]
    public string UserIdentifier { get; set; }

    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }    
}
