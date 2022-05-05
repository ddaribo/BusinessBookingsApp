using WebApplication1BusinessBookingsAppV2.Data;
using WebApplication1BusinessBookingsAppV2.Features.Businesses;

namespace WebApplication1BusinessBookingsAppV2.Features.Bookings.SoapService
{
    public class SoapBusinessService : BusinessService
    {
        public SoapBusinessService(BusinessBookingsDbContext context) : base(context)
        {
        }
    }
}
