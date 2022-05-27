using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net.Http;
using System.Threading.Tasks;
using WebApplication1BusinessBookingsAppV2.Data.Models;
using WebApplication1BusinessBookingsAppV2.Features.Bookings;
using WebApplication1BusinessBookingsAppV2.Features.Businesses;
using WebApplication1BusinessBookingsAppV2.Features.Identity;
using WebApplication1BusinessBookingsAppV2.Infrastructure;
using WebApplication1BusinessBookingsAppV2.Models.Businesses;

namespace WebApplication1BusinessBookingsAppV2.Controllers
{

    public class BookingsController : ApiController
    {
        private readonly IBookingService _bookingsService;
        private readonly IIdentityService _identityService;

        public BookingsController(
            IBookingService bookingsService,
            IIdentityService identityService
        )
        {
            _bookingsService = bookingsService;
            _identityService = identityService;
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult<object>> Create(CreateBookingRequest model)
        {
            // do not allow making a booking in the past
            if(model.BookingDateTime.ToLocalTime() < DateTime.UtcNow)
            {
                return BadRequest("Sorry, bookings cannot make be requested for a past time!");
            }

            var userId = this.User.GetId();
            var userMail = this._identityService.GetUserById(userId).Email;

            var id = await this._bookingsService.Create(
                model.BusinessId,
                model.BookingDateTime.ToLocalTime(),
                model.Notes,
                userId
            );

            var res = await this._bookingsService.BookingsEmailServiceRequest(userMail, model);

            return Created(nameof(this.Create), new { id =  id, res = res });
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

        [HttpGet("byBusiness/{id}")]
        public async Task<IEnumerable<BookingsViewModel>> BookingsByBusiness(int id)
        {
            return await this._bookingsService.GetBookingsByBusiness(id);
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
            var booking = await this._bookingsService.GetBooking(id);

            if (booking == null)
            {
                return NotFound("No such booking exists!");
            }

            return booking;
        }

        [Authorize("IsAdminUser")]
        [HttpPut]
        public async Task<ActionResult<BookingsViewModel>> Update(UpdateBookingRequestModel model)
        {
            if (model.BookingDateTime.ToLocalTime() < DateTime.UtcNow)
            {
                return BadRequest();
            }

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

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var userId = this.User.GetId();

            var updated = await this._bookingsService.DeleteBooking(id, userId);

            if (!updated)
            {
                return BadRequest("You are not allowed to delete this booking!");
            }

            return this.Ok();
        }
    }
}
