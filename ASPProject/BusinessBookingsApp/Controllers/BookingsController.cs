#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BusinessBookingsApp.Data;
using BusinessBookingsApp.Models;
using BusinessBookingsApp.Models.ViewModels;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;

namespace BusinessBookingsApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BookingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Bookings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookingViewModel>>> GetBookings()
        {
            return await _context.Bookings
                .Select(x => BookingItemToVM(x))
                .ToListAsync();
        }

        // GET: api/Bookings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BookingViewModel>> GetBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);

            if (booking == null)
            {
                return NotFound();
            }

            return BookingItemToVM(booking);
        }


        // GET: api/Bookings/userBookings
        [Authorize]
        [HttpGet("userBookings")]
        public async Task<ActionResult<IEnumerable<BookingViewModel>>> GetUserBookings()
        {
            return await _context.Bookings
                .Where(b => b.CreatedByUserId.Equals(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                .Select(x => BookingItemToVM(x))
                .ToListAsync();

        }


        // GET: api/Bookings/userBookings
        [HttpGet("byBusiness/{id}")]
        public async Task<ActionResult<IEnumerable<BookingViewModel>>> GetBookingsByBusiness(int id)
        {
            return await _context.Bookings
                .Where(b => b.BusinessId == id)
                .Select(x => BookingItemToVM(x))
                .ToListAsync();
        }


            [HttpPost("bookingForBusinessAndSlot")]
        public ActionResult<BookingViewModel> GetBookingForBusinessAndSlot(
            [FromBody] BookingBusinessAndSlot bookingBusinessAndSlot
            )
        {
            DateTime date = DateTime.Parse(bookingBusinessAndSlot.BookingDateTime).ToLocalTime();

            List<Booking> bookingsForBusiness = _context.Bookings
                .Where(b => b.BusinessId.Equals(int.Parse(bookingBusinessAndSlot.BusinessId))).ToList();


            var res = bookingsForBusiness
                .Where(b => (this.CompareDatesPrecisely(b.BookingDateTime, date) == 0))
                .Select(x => BookingItemToVM(x))
                .FirstOrDefault();
            return res;
        }

        // PUT: api/Bookings/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBooking(int id, BookingViewModel bookingVM)
        {
            if (id != bookingVM.BookingId)
            {
                return BadRequest();
            }

            _context.Entry(bookingVM).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Bookings
        [HttpPost]
        public async Task<ActionResult<BookingViewModel>> PostBooking(BookingViewModel bookingVM)
        {
            var bookingItem = new Booking
            {
                BusinessId = bookingVM.BusinessId,
                BookingDateTime = bookingVM.BookingDateTime.ToLocalTime(),
                CreatedByUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value
            };
            _context.Bookings.Add(bookingItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBooking", new { id = bookingItem.BookingId }, BookingItemToVM(bookingItem));
        }

        // DELETE: api/Bookings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookingExists(int id)
        {
            return _context.Bookings.Any(e => e.BookingId == id);
        }

        private int CompareDatesPrecisely(DateTime d1, DateTime d2)
        {
            d1 = new DateTime(d1.Year, d1.Month, d1.Day, d1.Hour, d1.Minute, 0);
            d2 = new DateTime(d2.Year, d2.Month, d2.Day, d2.Hour, d2.Minute, 0);

            return DateTime.Compare(d1, d2);
        }

        private static BookingViewModel BookingItemToVM(Booking booking) =>
          new BookingViewModel
          {
              BookingId = booking.BookingId,
              BusinessId = booking.BusinessId,
              BookingDateTime = booking.BookingDateTime
          };
    }

    public class BookingBusinessAndSlot
    {
        public string BusinessId { get; set; }
        public string BookingDateTime { get; set; }
    }
}
