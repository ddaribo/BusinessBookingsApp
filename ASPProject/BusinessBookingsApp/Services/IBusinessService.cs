using BusinessBookingsApp.Models.ViewModels;
using System.ServiceModel;

namespace BusinessBookingsApp.Services
{
    [ServiceContract]
    public interface IBusinessService
    {
        [OperationContract]
        Task<List<BusinessViewModel>> GetBusinesses();
        //string
    }
}
