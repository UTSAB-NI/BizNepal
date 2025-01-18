namespace BizNepal.Server.Interface
{
    public interface IEmailService
    {
        Task SendEmailAsync(string to, string subject, string body);
    }
}
