using BusinessBookingsApp.Data;
using BusinessBookingsApp.Models;
using Microsoft.EntityFrameworkCore;

namespace BusinessBookingsApp.Services
{
    public class BusinessService
    {
        readonly ApplicationDbContext _context;
        readonly ILogger _logger;
        public BusinessService(ApplicationDbContext context, ILoggerFactory factory)
        {
            _context = context;
            _logger = factory.CreateLogger<BusinessService>();
        }

        public async Task<List<Business>> GetBusinesses()
        {
            return await _context.Businesses
                //.Where(r => !r.IsDeleted)
                .Select(x => new Business
                {
                    BusinessId = x.BusinessId,
                    Name = x.Name,
                    Address = x.Address
                })
                .ToListAsync();
        }
    }
}
