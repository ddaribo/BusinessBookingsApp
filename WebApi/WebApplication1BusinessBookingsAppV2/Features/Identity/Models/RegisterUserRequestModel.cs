using System.ComponentModel.DataAnnotations;

namespace WebApplication1BusinessBookingsAppV2.Data.Models.Identity
{
    public class RegisterUserRequestModel
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
