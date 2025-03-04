﻿namespace BizNepal.Server.Models.DTO
{
    public class BookmarkResponseDto
    {
        public Guid Id { get; set; }
        public Guid BusinessId { get; set; }
        public string UserId { get; set; }
        public string BusinessName { get; set; }
        public string Description { get; set; }
        public string Website { get; set; }
        public string PhoneNumber { get; set; }

        public string Category { get; set; }

        public List<ImageResponseDto> BusinessImages { get; set; }

        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }

        public DateTime? UpdatedAt { get; set; }
        public string? UpdatedBy { get; set; }
    }
}
