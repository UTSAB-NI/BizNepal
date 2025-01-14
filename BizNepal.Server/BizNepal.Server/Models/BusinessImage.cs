﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BizNepal.Server.Models;

public class BusinessImage
{
    [Key]
    public Guid ImageId { get; set; }

    [Required]
    public string ImageUrl { get; set; }
    
    [Required]
    public Guid BusinessId { get; set; }

    // Navigation property
    public Business Business { get; set; }


}
