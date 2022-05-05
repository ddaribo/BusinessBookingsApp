using System;
using System.Collections.Generic;
using System.ServiceModel;
using System.Threading.Tasks;

namespace WebApplication1BusinessBookingsAppV2.Features.Businesses
{
    [ServiceContract]
    public interface IBookingService
    {
        [OperationContract]
        public Task<IEnumerable<BookingsViewModel>> GetAllBookings();
        [OperationContract]
        public Task<IEnumerable<BookingsViewModel>> GetBookingsByBusiness(int businessId);
        [OperationContract]
        public Task<int> Create(int businessId, DateTime bookingDateTime, string notes, string userId);
        [OperationContract]
        public Task<IEnumerable<BookingsViewModel>> MyBookings(string userId);
        [OperationContract]
        public Task<BookingsViewModel> GetBooking(int id);
        [OperationContract]
        public Task<bool> UpdateBooking(int businessId, DateTime bookingDateTime, string notes, string userId);
        [OperationContract]
        public Task<bool> DeleteBooking(int businessId, string userId);
        [OperationContract]
        public BookingsViewModel GetBookingsByBusinessAndSlot(int businessId, DateTime date);
    }
}
