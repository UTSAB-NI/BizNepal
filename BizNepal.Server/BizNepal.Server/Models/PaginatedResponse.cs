namespace BizNepal.Server.Models;

public class PaginatedResponse<T> where T : class
{
    public List<T> Items { get; set; }
    public int TotalCount { get; set; }
    public int TotalPage { get; set; }

}
