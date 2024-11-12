namespace BizNepal.Server.Models;

public class AuditModel
{

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string CreatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }
    public string UpdatedBy { get; set; }

    public DateTime? DeletedAt { get; set; }
    public string DeletedBy { get; set; }

    public bool IsDeleted { get; set; } = false;


}
