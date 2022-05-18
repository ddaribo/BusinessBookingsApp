using WebApplication1BusinessBookingsAppV2.Data.Models;

namespace WebApplication1BusinessBookingsAppV2.Features.Identity
{
    public class LoginResponseModel
    {
        public string Token { get; set; }
        public string UserId { get; set; }
    }
}
