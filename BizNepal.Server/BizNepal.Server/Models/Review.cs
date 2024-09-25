namespace BizNepal.Server.Models
{
    public class Review
    {
        public Guid ReviewId { get; set; }
        public string Comment { get; set; }

        public int Rating { get; set; }  // Individual customer rating

        public DateTime ReviewDate { get; set; }

        public Guid BusinessId { get; set; }
        public Business Business { get; set; }

        public string UserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }

    }
}
