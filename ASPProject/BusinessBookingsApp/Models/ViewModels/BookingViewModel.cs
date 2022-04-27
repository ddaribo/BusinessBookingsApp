namespace BusinessBookingsApp.Models.ViewModels
{
    public class BookingViewModel
    {
        public int BookingId { get; set; }
        public int BusinessId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        public DateTime Date { get; set; }

        public TimeSpan Time { get; set; }
    }
}
