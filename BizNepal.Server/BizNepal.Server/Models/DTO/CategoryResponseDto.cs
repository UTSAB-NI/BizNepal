using System.ComponentModel.DataAnnotations;

namespace BizNepal.Server.Models.DTO
{
    public class CategoryResponseDto
    {
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string? IconPath { get; set; }
    }
}
