using BusinessBookingsApp.Controllers;
using BusinessBookingsApp.Data;
using BusinessBookingsApp.Models;
using BusinessBookingsApp.Models.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace BusinessBookingsApp.Services
{
    public class BusinessService : IBusinessService
    {
        readonly ApplicationDbContext _context;
        readonly ILogger _logger;
        public BusinessService(ApplicationDbContext context, ILoggerFactory factory)
        {
            _context = context;
            _logger = factory.CreateLogger<BusinessService>();
        }

        public async Task<List<BusinessViewModel>> GetBusinesses()
        {
            return await _context.Businesses
                //.Where(r => !r.IsDeleted)
                .Select(x => BusinessesController.BusinessItemToVM(x))
                .ToListAsync();
        }

     
    }
}
