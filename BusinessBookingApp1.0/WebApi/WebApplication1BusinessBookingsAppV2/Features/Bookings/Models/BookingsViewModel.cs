using System;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1BusinessBookingsAppV2.Features.Businesses
{
    public class BookingsViewModel
    {
        public int BookingId { get; set; }
        public int BusinessId { get; set; }
        public DateTime BookingDateTime { get; set; }
        public string? Notes { get; set; }
        //public List<OfferedService>? RequestedServices { get; set; }
        public string? UserId { get; set; }
    }
}
