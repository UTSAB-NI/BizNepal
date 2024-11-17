using Microsoft.EntityFrameworkCore;
using BizNepal.Server.Data;
using BizNepal.Server.Models;
using Microsoft.AspNetCore.Identity;

namespace BizNepal.Server.Helper;

public static class DatabaseHelper
{
    public static async Task EnsureUncategorizedCategoryExists(ApplicationDbContext context)
    {
        // Check specifically for "Uncategorized" category
        var uncategorized = await context.Categories
            .FirstOrDefaultAsync(c => c.CategoryName == "Uncategorized");

        if (uncategorized == null)
        {
            var category = new Category
            {
                CategoryId = Guid.NewGuid(),
                CategoryName = "Uncategorized",
                CreatedAt = DateTime.UtcNow,
                CreatedBy = "System"
            };
            // Add "Uncategorized" if not found
            context.Categories.Add(category);
            await context.SaveChangesAsync();
        }
    }

    public static async Task SeedSuperAdmin(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();

        string superAdminRole = "SuperAdmin";
        string superAdminEmail = "superadmin@gmail.com";
        string superAdminPassword = "Super@1234";

        // Check if the SuperAdmin role exists
        if (!await roleManager.RoleExistsAsync(superAdminRole))
        {
            var role = new IdentityRole(superAdminRole);
            await roleManager.CreateAsync(role);
        }

        // Check if the SuperAdmin user exists
        var user = await userManager.FindByEmailAsync(superAdminEmail);
        if (user == null)
        {
            // Create the SuperAdmin user
            user = new ApplicationUser
            {
                UserName = superAdminRole,
                Email = superAdminEmail,
                EmailConfirmed = true // Confirm the email by default
            };
            var result = await userManager.CreateAsync(user, superAdminPassword);

            if (result.Succeeded)
            {
                // Assign the SuperAdmin role to the user
                await userManager.AddToRoleAsync(user, superAdminRole);
            }
            else
            {
                throw new Exception($"Failed to create SuperAdmin user: {string.Join(", ", result.Errors)}");
            }
        }


    }

    }