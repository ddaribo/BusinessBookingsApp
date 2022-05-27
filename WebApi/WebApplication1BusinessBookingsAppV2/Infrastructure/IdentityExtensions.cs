using System.Linq;
using System.Security.Claims;

namespace WebApplication1BusinessBookingsAppV2.Infrastructure
{
    public static class IdentityExtensions
    {
        public static string GetId(this ClaimsPrincipal user)
            => user
                .Claims
                .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?
                .Value;

    }
}
