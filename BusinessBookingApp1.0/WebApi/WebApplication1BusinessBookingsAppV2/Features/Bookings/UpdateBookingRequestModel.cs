using System;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1BusinessBookingsAppV2.Features.Bookings
{
    public class UpdateBookingRequestModel
    {
        [Required]
        public int BookingId { get; set; }
        [Required]
        public DateTime BookingDateTime { get; set; }
        [Required]
        public string? Notes { get; set; }
    }
}
