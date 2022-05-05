using System.ComponentModel.DataAnnotations;

namespace WebApplication1BusinessBookingsAppV2.Features.Bookings
{
    public class BookingBusinessAndSlotRequest
    {
        [Required]
        public int BusinessId { get; set; }
        [Required]
        public string BookingDateTime { get; set; }
    }
}
