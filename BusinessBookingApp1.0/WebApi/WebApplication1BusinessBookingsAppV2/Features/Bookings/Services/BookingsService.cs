using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using WebApplication1BusinessBookingsAppV2.Data;
using WebApplication1BusinessBookingsAppV2.Data.Models;
using WebApplication1BusinessBookingsAppV2.Models.Businesses;
using static System.Net.Mime.MediaTypeNames;

namespace WebApplication1BusinessBookingsAppV2.Features.Businesses
{
    public class BookingsService : IBookingService
    {
        private readonly BusinessBookingsDbContext _context;
        private readonly IHttpClientFactory _factory;

        public BookingsService(
            BusinessBookingsDbContext context,
            IHttpClientFactory factory
        )
        {
            _context = context;
            _factory = factory;
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


        public async Task<bool> DeleteBooking(int bookingId, string userId)
        {
            var booking = await this._context
                .Bookings.Where(b => b.BookingId == bookingId && b.UserId == userId)
                .FirstOrDefaultAsync();

            // cannot delete booking later than 5 hours before its due date and time

            if (booking == null || DateTime.Now.ToLocalTime() > booking.BookingDateTime.ToLocalTime().AddHours(-5))
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

        public BookingsViewModel GetBookingsByBusinessAndSlot(int businessId, DateTime date)
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
        public async Task<string> BookingsEmailServiceRequest(string mail, CreateBookingRequest model)
        {
            HttpClient httpClient = _factory.CreateClient("emailReminders");

            var business = _context.Businesses.Where(b=> b.BusinessId == model.BusinessId).FirstOrDefault();

            var content = "You have requested a booking for " + business.Name + " on " + model.BookingDateTime.ToLocalTime().ToString("F") + ".\n";
            content += "A reminder email will be issued 3 hours before your booking!";
            if(model.Notes != null && model.Notes != "")
            {
                content += "Additional notes to your booking:\n" + model.Notes;
            }

            var reminderContent = "This is a reminder for your booking for " + business.Name + " on " + model.BookingDateTime.ToString("F") + " (in three hours).\n";

            var bodyObject = new
            {
                receiver = mail,
                content = content,
                reminderContent = reminderContent,
                booking_time = model.BookingDateTime.ToLocalTime(),
            };

            Debug.WriteLine(bodyObject.booking_time);

            var bodyObjectJson = new StringContent(
                JsonSerializer.Serialize(bodyObject),
                Encoding.UTF8,
                Application.Json
            );

            var response = await httpClient.PostAsync("email", bodyObjectJson);

            response.EnsureSuccessStatusCode();

            return await response.Content.ReadAsStringAsync();
        }
    }
}
