using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1BusinessBookingsAppV2.Data;
using WebApplication1BusinessBookingsAppV2.Data.Models;

namespace WebApplication1BusinessBookingsAppV2.Features.Businesses
{
    public class BookingsService : IBookingService
    {
        private readonly BusinessBookingsDbContext _context;

        public BookingsService(BusinessBookingsDbContext context)
        {
            _context = context;
        }

        public async Task<int> Create(int businessId, DateTime bookingDateTime, string notes, string userId)
        {
            var booking = new Booking
            {
                BookingDateTime = bookingDateTime,
                Notes = notes,
                IsBusinessDeletedByOwner = false,
                UserId = userId,
                BusinessId = businessId
            };

            _context.Add(booking);

            await _context.SaveChangesAsync();

            return booking.BusinessId;
        }

        public async Task<BookingsViewModel> GetBooking(int id)
        {
            return await _context
               .Bookings
               .Where(b => b.BookingId == id)
               .Where(b => b.IsBusinessDeletedByOwner == null || b.IsBusinessDeletedByOwner == false)
               .Select(b => new BookingsViewModel()
               {
                   BookingId = b.BookingId,
                   BookingDateTime = b.BookingDateTime,
                   Notes = b.Notes,
                   UserId = b.UserId,
                   BusinessId = b.BusinessId
               })
               .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<BookingsViewModel>> MyBookings(string userId)
        {
            return await this._context
               .Bookings
               .Where(b => b.UserId == userId)
               .Where(b => b.IsBusinessDeletedByOwner == false || b.IsBusinessDeletedByOwner == null)
               .Select(b => new BookingsViewModel()
               {
                   BookingId = b.BookingId,
                   BusinessId = b.BusinessId,
                   BookingDateTime = b.BookingDateTime,
                   Notes = b.Notes,
                   UserId = userId,
               })
               .ToListAsync();
        }


        public async Task<bool> UpdateBusiness(int id, string name, string address, string imageUrl, string userId)
        {
            var business = await this._context
                .Businesses.Where(b => b.BusinessId == id && b.UserId == userId)
                .FirstOrDefaultAsync();

            if (business == null)
            {
                return false;
            }

            business.Name = name;
            business.Address = address;
            business.ImageUrl = imageUrl;

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteBooking(int bookingId, string userId)
        {
            var booking = await this._context
                .Bookings.Where(b => b.BookingId == bookingId && b.UserId == userId)
                .FirstOrDefaultAsync();

            if (booking == null)
            {
                return false;
            }

            _context.Remove(booking);

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> UpdateBooking(int bookingId, DateTime bookingDateTime, string notes, string userId)
        {
            var booking = await this._context
              .Bookings.Where(b => b.BookingId == bookingId && b.UserId == userId)
              .FirstOrDefaultAsync();

            if (booking == null)
            {
                return false;
            }

            booking.BookingDateTime = bookingDateTime;
            booking.Notes = notes;

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<BookingsViewModel>> GetAllBookings()
        {
            return await this._context
              .Bookings
              .Where(b => b.IsBusinessDeletedByOwner == false || b.IsBusinessDeletedByOwner == null)
              .Select(b => new BookingsViewModel()
              {
                  BookingId = b.BookingId,
                  BusinessId = b.BusinessId,
                  BookingDateTime = b.BookingDateTime,
                  Notes = b.Notes,
                  UserId = b.UserId,
              })
              .ToListAsync();
        }

        public async Task<IEnumerable<BookingsViewModel>> GetBookingsByBusiness(int businessId)
        {
            return await _context.Bookings
               .Where(b => b.BusinessId == businessId)
               .Where(b => b.IsBusinessDeletedByOwner == false || b.IsBusinessDeletedByOwner == null)
               .Select(b => new BookingsViewModel()
               {
                   BookingId = b.BookingId,
                   BusinessId = b.BusinessId,
                   BookingDateTime = b.BookingDateTime,
                   Notes = b.Notes,
                   UserId = b.UserId,
               })
               .ToListAsync();
        }

        public  BookingsViewModel GetBookingsByBusinessAndSlot(int businessId, DateTime date)
        {
            List<Booking> bookingsForBusiness = _context.Bookings
               .Where(b => b.BusinessId.Equals(businessId))
               .Where(b => b.IsBusinessDeletedByOwner == false || b.IsBusinessDeletedByOwner == null)
               .ToList();

            var res = bookingsForBusiness
             .Where(b => (this.CompareDatesPrecisely(b.BookingDateTime, date) == 0))
             .Select(b => new BookingsViewModel()
             {
                 BookingId = b.BookingId,
                 BusinessId = b.BusinessId,
                 BookingDateTime = b.BookingDateTime,
                 Notes = b.Notes,
                 UserId = b.UserId,
             }).FirstOrDefault();
            return res;
        }
        private int CompareDatesPrecisely(DateTime d1, DateTime d2)
        {
            d1 = new DateTime(d1.Year, d1.Month, d1.Day, d1.Hour, d1.Minute, 0);
            d2 = new DateTime(d2.Year, d2.Month, d2.Day, d2.Hour, d2.Minute, 0);

            return DateTime.Compare(d1, d2);
        }
    }
}
