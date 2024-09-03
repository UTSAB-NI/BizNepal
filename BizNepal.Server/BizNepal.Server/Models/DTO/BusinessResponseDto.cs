namespace BizNepal.Server.Models.DTO
{
    public class BusinessResponseDto
    {
       
            public Guid BusinessId { get; set; }
            public string BusinessName { get; set; }
            public string Description { get; set; }
            public string Website { get; set; }
            public string PhoneNumber { get; set; }
            public Location Location { get; set; }
            public string UserId { get; set; }
            public List<Review> Reviews { get; set; }
        
    }
}
