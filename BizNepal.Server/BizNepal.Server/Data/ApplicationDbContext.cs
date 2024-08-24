﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using BizNepal.Server.Models;

namespace BizNepal.Server.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var BusinessOwner = "e2ae5491-a104-4f69-af2e-28f021b9b762";
            var Admin = "f5af7f50-f4e6-412a-a82b-bcba7bd63abd";
            var GeneralUser = "0ddc3a39-2a47-4bcd-8ecf-1d68ec35eee5";

            var roles = new List<IdentityRole>
            {

                new IdentityRole
                {
                     Id=BusinessOwner,
                     ConcurrencyStamp=BusinessOwner,
                     Name="BusinessOwner",
                     NormalizedName="BUSINESSOWNER"
                },
                 new IdentityRole
                {
                     Id=Admin,
                     ConcurrencyStamp=Admin,
                     Name="Admin",
                     NormalizedName="ADMIN"
                } ,new IdentityRole
                {
                     Id=GeneralUser,
                     ConcurrencyStamp=GeneralUser,
                     Name="GeneralUser",
                     NormalizedName="GENERALUSER"
                }

            };

            modelBuilder.Entity<IdentityRole>().HasData(roles);



        }
    }
}
