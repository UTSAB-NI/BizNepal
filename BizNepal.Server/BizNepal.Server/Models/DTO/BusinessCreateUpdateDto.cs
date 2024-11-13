namespace BizNepal.Server.Models.DTO;

public class BusinessCreateUpdateDto
{
    public string BusinessName { get; set; }
    public string Description { get; set; }
    public string Website { get; set; }
    public string PhoneNumber { get; set; }
    public string? Latitude { get; set; }
    public string? Longitude { get; set; }
    public string CategoryName { get; set; }

    public List<IFormFile>? Images { get; set; }
}
