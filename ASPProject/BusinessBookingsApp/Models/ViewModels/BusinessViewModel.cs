﻿namespace BusinessBookingsApp.Models.ViewModels
{
    public class BusinessViewModel
    {
        public int BusinessId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public List<Booking> Bookings { get; set; }
    }
}