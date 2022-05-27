using WebApplication1BusinessBookingsAppV2.Data.Models;

namespace WebApplication1BusinessBookingsAppV2.Features.Identity
{
    public interface IIdentityService
    {
        string GenerateJwtToken(string userId, string userName, string email, string secret);

        User GetUserById(string id);
    }
}
