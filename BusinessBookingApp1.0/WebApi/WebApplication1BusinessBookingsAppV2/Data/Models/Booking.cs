using System;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1BusinessBookingsAppV2.Data.Models
{
    public class Booking
    {
        public int BookingId { get; set; }
        [Required]
        public DateTime BookingDateTime { get; set; }
        public string? Notes { get; set; }
       // public List<OfferedService>? RequestedServices { get; set; }
        [Required]
        public int BusinessId { get; set; }
        [Required]
        public Business Business { get; set; }
        public bool? IsBusinessDeletedByOwner { get; set; }
        [Required]
        public string UserId { get; set; }
        [Required]
        public User User { get; set; }
    }
}
