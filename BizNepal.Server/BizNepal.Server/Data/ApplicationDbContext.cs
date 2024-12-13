using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using BizNepal.Server.Models;
using BizNepal.Server.Helper;

namespace BizNepal.Server.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
    public DbSet<Business> Businesses { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Location> Locations { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<BusinessImage> BusinessImages { get; set; }
    public DbSet<Address> Addresses { get; set; }




    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            var properties = entityType.ClrType.GetProperties()
                .Where(p => p.PropertyType == typeof(DateTime) || p.PropertyType == typeof(DateTime?));

            foreach (var property in properties)
            {
                modelBuilder.Entity(entityType.ClrType)
                    .Property(property.Name)
                    .HasConversion<DateTimeUtcConverter>();
            }
        }
        //seed role table

        var BusinessOwner = "e2ae5491-a104-4f69-af2e-28f021b9b762";
        var Admin = "f5af7f50-f4e6-412a-a82b-bcba7bd63abd";
        var GeneralUser = "0ddc3a39-2a47-4bcd-8ecf-1d68ec35eee5";
        //var SuperAdmin = "5c656565-d97d-4ec1-902e-fdb635fb43dc";

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



        // Cascade delete BusinessImages when business is deleted
        modelBuilder.Entity<BusinessImage>()
            .HasOne(bi => bi.Business)
            .WithMany(b => b.BusinessImages)
            .HasForeignKey(bi => bi.BusinessId)
            .OnDelete(DeleteBehavior.Cascade);

        // Configure delete behavior for Reviews when business is deleted
        modelBuilder.Entity<Review>()
            .HasOne(r => r.Business)
            .WithMany(b => b.Reviews)
            .HasForeignKey(r => r.BusinessId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Business>()
        .Property(b => b.OverallRating)
        .HasColumnType("decimal(18,2)");


        modelBuilder.Entity<Business>()
        .HasOne(b => b.Address) // Business has one Address
        .WithOne()             // Address has no navigation to Business
        .HasForeignKey<Business>(b => b.AddressId) // Foreign key is AddressId
        .OnDelete(DeleteBehavior.Cascade); // Cascade on delete




    }
}
