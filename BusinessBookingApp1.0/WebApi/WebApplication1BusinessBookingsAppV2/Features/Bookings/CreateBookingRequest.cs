using System;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1BusinessBookingsAppV2.Models.Businesses
{
    public class CreateBookingRequest
    {
        [Required]
        public int BusinessId { get; set; }
        [Required]
        public DateTime BookingDateTime { get; set; }
        public string? Notes { get; set; }
    }
}
