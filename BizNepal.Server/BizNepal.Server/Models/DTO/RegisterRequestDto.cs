using System.ComponentModel.DataAnnotations;

namespace BizNepal.Server.Models.DTO
{
    public class RegisterRequestDto
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public string UserName { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; } 

        public string[] Roles { get; set; }
    }
}
