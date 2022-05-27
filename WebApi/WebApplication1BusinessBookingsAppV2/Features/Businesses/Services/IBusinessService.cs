using System.Collections.Generic;
using System.ServiceModel;
using System.Threading.Tasks;

namespace WebApplication1BusinessBookingsAppV2.Features.Businesses
{
    [ServiceContract]
    public interface IBusinessService
    {
        [OperationContract]
        public Task<IEnumerable<BusinessViewModel>> GetAllBusinesses();
        [OperationContract]
        public Task<int> Create(
            string name,
            string address,
            string imageUrl,
            int workHoursStart,
            int workHoursEnd,
            float timeSlotLength,
            string userId
            );

        [OperationContract]
        public Task<IEnumerable<BusinessViewModel>> MyBusinesses(string userId);
        [OperationContract]
        public Task<BusinessViewModel> GetBusiness(int id);
        [OperationContract]
        public Task<bool> UpdateBusiness(int id, string name, string address, string imageUrl, string userId);
        [OperationContract]
        public Task<bool> DeleteBusiness(int businessId, string userId);
    }
}
