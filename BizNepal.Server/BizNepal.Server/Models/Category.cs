using System.ComponentModel.DataAnnotations;

namespace BizNepal.Server.Models;

public class Category :AuditModel
{
    [Key]
    public Guid CategoryId { get; set; }
    public string CategoryName { get; set; }
    public string? IconPath { get; set; }

}
