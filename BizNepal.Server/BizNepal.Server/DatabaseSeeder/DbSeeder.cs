using BizNepal.Server.Data;
using BizNepal.Server.Models;

namespace BizNepal.Server.DatabaseSeeder;

public static class DbSeeder
{
    public static async Task CategorySeeder(ApplicationDbContext _context)
    {
        
        if (_context.Categories.Count()==1)
        {
            var categories = JsonHelper.LoadJson<Category>("json/category.json");
            await _context.Categories.AddRangeAsync(categories);
            await _context.SaveChangesAsync();
        }
    }

    public static async Task LocationSeeder(ApplicationDbContext _context)
    {
        if (!_context.Locations.Any())
        {
            var locations = JsonHelper.LoadJson<Location>("json/location.json");
            await _context.Locations.AddRangeAsync(locations);
            await _context.SaveChangesAsync();
        }
    }

    public static async Task AddressSeeder(ApplicationDbContext _context)
    {
        if (!_context.Addresses.Any())
        {
            var address = JsonHelper.LoadJson<Address>("json/address.json");
            await _context.Addresses.AddRangeAsync(address);
            await _context.SaveChangesAsync();
        }
    }

    public static async Task BusinessSeeder(ApplicationDbContext _context)
    {
        if (!_context.Businesses.Any())
        {
            var business = JsonHelper.LoadJson<Business>("json/business.json");
            await _context.Businesses.AddRangeAsync(business);
            await _context.SaveChangesAsync();
        }
    }

    public static async Task ReviewSeeder(ApplicationDbContext _context)
    {
        if (!_context.Reviews.Any())
        {
            var reviews = JsonHelper.LoadJson<Review>("json/review.json");
            await _context.Reviews.AddRangeAsync(reviews);
            await _context.SaveChangesAsync();
        }
    }
}
