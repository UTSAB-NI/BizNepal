namespace BizNepal.Server.Models;

public class AuditModel
{

    public DateTime CreatedAt { get; set; } 
    public string CreatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }
    public string? UpdatedBy { get; set; }


}
