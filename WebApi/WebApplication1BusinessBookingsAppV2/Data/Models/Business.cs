using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1BusinessBookingsAppV2.Data.Models
{
    public class Business
    {
        public int BusinessId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Address { get; set; }
        //public List<OfferedService>? OfferedServices { get; set; }
        public string? ImageUrl { get; set; }
        [Range(0, 23)]
        [Required]
        public int WorkHoursStart { get; set; }
        [Range(0, 23)]
        [Required]
        public int WorkHoursEnd { get; set; }
        [Required]
        [Range(0.5, 23)]
        public float TimeSlotLength { get; set; }
        public List<Booking> Bookings { get; set; }
        public bool? IsRemovedByOwner { get; set; }
        [Required]
        public string UserId { get; set; }
        [Required]
        public User User { get; set; }
    }
}
