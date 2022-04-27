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
                BookingId = bookingVM.BookingId,
                BusinessId = bookingVM.BusinessId,
                ApplicationUser = bookingVM.ApplicationUser,
                Date = bookingVM.Date,
                Time = bookingVM.Time,
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

        private static BookingViewModel BookingItemToVM(Booking booking) =>
          new BookingViewModel
          {
              BookingId = booking.BookingId,
              BusinessId = booking.BusinessId,
              ApplicationUser = booking.ApplicationUser,
              Date = booking.Date,
              Time = booking.Time,
          };
    }
}
