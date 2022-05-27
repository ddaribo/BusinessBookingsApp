using System.ComponentModel.DataAnnotations;

namespace WebApplication1BusinessBookingsAppV2.Features.Businesses
{
    public class UpdateBusinessRequestModel
    {
        [Required]
        public int BusinessId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Address { get; set; }
        //public List<OfferedService>? OfferedServices { get; set; }
        public string? ImageUrl { get; set; }
    }
}
