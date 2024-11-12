namespace BizNepal.Server.Models;

public class PaginatedResponse<T> where T : class
{
    public List<T> Businesses { get; set; } = new List<T>();

    public int CurrentPage { get; set; }

    public int TotalPages { get; set; }

    public int PageSize { get; set; }

    public string? SearchTerm { get; set; }

    public string? SortColumn { get; set; }

    public int BookCount { get; set; }

    public bool IsAscending { get; set; }

}
