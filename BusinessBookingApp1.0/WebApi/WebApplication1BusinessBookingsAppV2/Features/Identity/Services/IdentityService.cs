using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using WebApplication1BusinessBookingsAppV2.Data;
using WebApplication1BusinessBookingsAppV2.Data.Models;

namespace WebApplication1BusinessBookingsAppV2.Features.Identity
{
    public class IdentityService: IIdentityService
    {
        private readonly BusinessBookingsDbContext _context;

        public IdentityService(BusinessBookingsDbContext context)
        {
            _context = context;
        }
        public string GenerateJwtToken(string userId, string userName, string email, string secret)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, userId),
                    new Claim(ClaimTypes.Name, userName),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var encryptedToken = tokenHandler.WriteToken(token);

            return encryptedToken;
        }

        public User GetUserById(string id)
        {
            return this._context.Users.Where(user => user.Id == id).FirstOrDefault();
        }
    }
}
