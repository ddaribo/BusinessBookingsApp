using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1BusinessBookingsAppV2.Data;
using WebApplication1BusinessBookingsAppV2.Data.Models;

namespace WebApplication1BusinessBookingsAppV2.Features.Businesses
{
    public class BusinessService : IBusinessService
    {
        private readonly BusinessBookingsDbContext _context;

        public BusinessService(BusinessBookingsDbContext context)
        {
            _context = context;
        }
        public async Task<int> Create(string name, string address, string imageUrl, int workHoursStart, int workHoursEnd, float timeSlotLength, string userId)
        {
            var business = new Business
            {
                Name = name,
                Address = address,
                ImageUrl = imageUrl,
                WorkHoursStart = workHoursStart,
                WorkHoursEnd = workHoursEnd,
                TimeSlotLength = timeSlotLength,
                UserId = userId,
            };

            _context.Add(business);

            await _context.SaveChangesAsync();

            return business.BusinessId;
        }

        public async Task<BusinessViewModel> GetBusiness(int id)
        {
            return await _context
                .Businesses
                .Where(b => b.BusinessId == id)
                .Select(b => new BusinessViewModel()
                {
                    BusinessId = b.BusinessId,
                    Name = b.Name,
                    Address = b.Address,
                    ImageUrl = b.ImageUrl,
                    WorkHoursStart = b.WorkHoursStart,
                    WorkHoursEnd = b.WorkHoursEnd,
                    TimeSlotLength = b.TimeSlotLength,
                    UserId=b.UserId,
                    UserName = b.User.UserName,
                })
                .FirstOrDefaultAsync();

           // return business;
        }

        public async Task<IEnumerable<BusinessViewModel>> MyBusinesses(string userId)
        {
            return await this._context
                .Businesses
                .Where(b => b.UserId == userId)
                .Where(b=> b.IsRemovedByOwner == false || b.IsRemovedByOwner == null)
                .Select(b => new BusinessViewModel()
                {
                    BusinessId = b.BusinessId,
                    Name = b.Name,
                    Address = b.Address,
                    ImageUrl= b.ImageUrl,
                    WorkHoursStart = b.WorkHoursStart,
                    WorkHoursEnd= b.WorkHoursEnd,
                    TimeSlotLength= b.TimeSlotLength,
                    UserName= b.UserId,
                })
                .ToListAsync();
        }

        public async Task<bool> UpdateBusiness(int id, string name, string address, string imageUrl, string userId)
        {
            var business = await this._context
                .Businesses.Where(b => b.BusinessId == id && b.UserId == userId)
                .FirstOrDefaultAsync();

            if(business == null)
            {
                return false;
            }

            business.Name = name;
            business.Address = address;
            business.ImageUrl = imageUrl;

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteBusiness(int businessId, string userId)
        {
            var business = await this._context
                .Businesses.Where(b => b.BusinessId == businessId && b.UserId == userId)
                .FirstOrDefaultAsync();

            if (business == null)
            {
                return false;
            }

            business.IsRemovedByOwner = true;

            var businessBookings = _context.Bookings
               .Where(b => b.BusinessId == businessId)
               .ToList();

            foreach (var booking in businessBookings)
            {
                booking.IsBusinessDeletedByOwner = true;
            }

            await _context.SaveChangesAsync();

            return true;
        }

    }
}
