namespace BusinessBookingsApp.Models
{
    public class Booking
    {
        public int BookingId { get; set; }
        public int BusinessId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        public DateTime Date { get; set; }

        public TimeSpan Time { get; set; }
    }
}
