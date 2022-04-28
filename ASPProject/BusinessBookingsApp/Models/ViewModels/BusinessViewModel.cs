namespace BusinessBookingsApp.Models.ViewModels
{
    public class BusinessViewModel
    {
        public int BusinessId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }

        public int WorkHoursStart { get; set; }
       
        public int WorkHoursEnd { get; set; }
        public float TimeSlotLength { get; set; }
    }
}
