using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1BusinessBookingsAppV2.Data.Models;
using WebApplication1BusinessBookingsAppV2.Features.Bookings;
using WebApplication1BusinessBookingsAppV2.Features.Businesses;
using WebApplication1BusinessBookingsAppV2.Infrastructure;
using WebApplication1BusinessBookingsAppV2.Models.Businesses;

namespace WebApplication1BusinessBookingsAppV2.Controllers
{

    public class BookingsController : ApiController
    {
        private readonly IBookingService _bookingsService;

        public BookingsController(IBookingService bookingsService)
        {
            _bookingsService = bookingsService;
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult<IEnumerable<Business>>> Create(CreateBookingRequest model)
        {
            var userId = this.User.GetId();

            var id = await this._bookingsService.Create(
                model.BusinessId,
                model.BookingDateTime.ToLocalTime(),    // !!
                model.Notes,
                userId
            );

            return Created(nameof(this.Create), id);
        }

        [HttpGet]
        public async Task<IEnumerable<BookingsViewModel>> AllBookings()
        {
            return await this._bookingsService.GetAllBookings();
        }

        [Authorize]
        [HttpGet("my")]
        public async Task<IEnumerable<BookingsViewModel>> MyBookings()
        {
            var userId = this.User.GetId();

            return await this._bookingsService.MyBookings(userId);
        }

        [HttpPost("byBusiness/{id}")]
        public async Task<IEnumerable<BookingsViewModel>> BookingsByBusiness(int businessId)
        {
            return await this._bookingsService.GetBookingsByBusiness(businessId);
        }

        [HttpPost("byBusinessAndSlot")]
        public ActionResult<BookingsViewModel> BookingsByBusinessAndSlot(
            BookingBusinessAndSlotRequest bookingBusinessAndSlot
        )
        {
            DateTime date = DateTime.Parse(bookingBusinessAndSlot.BookingDateTime).ToLocalTime();
            return this._bookingsService.GetBookingsByBusinessAndSlot(
                bookingBusinessAndSlot.BusinessId,
                date
            );
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<BookingsViewModel>> Details(int id)
        {
            var business = await this._bookingsService.GetBooking(id);

            if (business == null)
            {
                return NotFound();
            }

            return business;
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult<BookingsViewModel>> Update(UpdateBookingRequestModel model)
        {
            var userId = this.User.GetId();

            var updated = await this._bookingsService.UpdateBooking(
                model.BookingId,
                model.BookingDateTime, 
                model.Notes, 
                userId);

            if (!updated)
            {
                return BadRequest();
            }

            return this.Ok();
        }

        [Authorize]
        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var userId = this.User.GetId();

            var updated = await this._bookingsService.DeleteBooking(id, userId);

            if (!updated)
            {
                return BadRequest();
            }

            return this.Ok();
        }
    }
}
