namespace BizNepal.Server.Models.DTO
{
    public class PaginatedResponseDto<T>
    {
        public List<T> Items { get; set; }  
        public int TotalCount { get; set; }
        public int TotalPage { get; set; }
    }
}
