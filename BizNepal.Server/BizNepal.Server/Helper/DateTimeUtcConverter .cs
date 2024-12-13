using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BizNepal.Server.Helper;

public class DateTimeUtcConverter : ValueConverter<DateTime?, DateTime?>
{
    public DateTimeUtcConverter()
        : base(
              v => v.HasValue ? DateTime.SpecifyKind(v.Value, DateTimeKind.Utc) : v,
              v => v.HasValue ? DateTime.SpecifyKind(v.Value, DateTimeKind.Utc) : v
            )
    {
    }
}
