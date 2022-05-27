using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace WebApplication1BusinessBookingsAppV2.Data.Models
{
    public class User: IdentityUser
    {
        public IEnumerable<Business> Businesses { get; } = new HashSet<Business>();
    }
}
