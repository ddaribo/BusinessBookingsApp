using System.ComponentModel.DataAnnotations;

namespace BusinessBookingsApp.Models
{
    public class Business
    {
        public int BusinessId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        [Range(0, 23)]
        public int WorkHoursStart { get; set; }
        [Range(0, 23)]
        public int WorkHoursEnd { get; set; }
        [Range(0.5,23)]
        public float TimeSlotLength { get; set; }
        public string? ApplicationUserId { get; set; }
        public virtual ApplicationUser? ApplicationUser { get; set; }
    }
}
