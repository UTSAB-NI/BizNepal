using System.ComponentModel.DataAnnotations;

namespace BizNepal.Server.Models.DTO
{
    public class UpdatePasswordDto
    {
        [Required]
        public string CurrentPassword { get; set; }
        [Required]
        public string NewPassword { get; set; }
    }
}
