using System.ComponentModel.DataAnnotations;

namespace BizNepal.Server.Models.DTO
{
    public class UpdateProfileDto
    {
        public string? Username { get; set; }

        [RegularExpression(@"^[^@\s]+@[^@\s]+\.[^@\s]+$", ErrorMessage = "Invalid email format.")]
        public string? Email { get; set; }

        [MaxLength(10, ErrorMessage = "Phone Number must be 10 digit long")]
        public string? PhoneNumber { get; set; } 
    }
}
