namespace BusinessBookingsApp.Models.ViewModels
{
    public class BookingViewModel
    {
        public int BookingId { get; set; }
        public int BusinessId { get; set; }
        public DateTime BookingDateTime { get; set; }
        public string? Notes { get; set; }
        public List<OfferedService>? RequestedServices { get; set; }
        public string? CreatedByUserId { get; set; }
    }
}
