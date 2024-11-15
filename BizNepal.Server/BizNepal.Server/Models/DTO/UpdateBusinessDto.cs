namespace BizNepal.Server.Models.DTO;

public class UpdateBusinessDto
{
    public string BusinessName { get; set; }
    public string Description { get; set; }
    public string Website { get; set; }
    public string PhoneNumber { get; set; }
    public Guid CategoryId { get; set; }

}
