namespace BusinessBookingsApp.Models
{
    public class Business
    {
        public int BusinessId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public List<Booking> Bookings { get; set; }
    }
}
