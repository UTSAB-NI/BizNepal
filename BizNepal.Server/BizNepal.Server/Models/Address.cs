using System.ComponentModel.DataAnnotations;

namespace BizNepal.Server.Models;

public class Address
{
    [Key]
    public Guid AddressId { get; set; }
    
    public string City { get; set; }
    
    public string District { get; set; }

}
