using System.ComponentModel.DataAnnotations;

namespace BusinessBookingsApp.Models
{
    public class Booking
    {
        public int BookingId { get; set; }
        [Required]
        public DateTime BookingDateTime { get; set; }
        public string? Notes { get; set; }
        public List<OfferedService>? RequestedServices { get; set; }
        [Required]
        public int BusinessId { get; set; }
        [Required]
        public Business Business { get; set; }
        public bool? IsBusinessDeletedByOwner { get; set; }
        [Required]
        public string ApplicationUserId { get; set; }
        [Required]
        public ApplicationUser ApplicationUser { get; set; }
    }
}
