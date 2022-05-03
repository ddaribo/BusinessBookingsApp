namespace BusinessBookingsApp.Models
{
    public class OfferedService
    {
        public int OfferedServiceId { get; set; }
        public string ServiceName { get; set; }
        public int BusinessId { get; set; }
        public Business Business { get; set; }
    }
}
