using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebApplication1BusinessBookingsAppV2.Data.Models;

namespace WebApplication1BusinessBookingsAppV2.Data
{
    public class BusinessBookingsDbContext : IdentityDbContext<User>
    {
        public BusinessBookingsDbContext(DbContextOptions<BusinessBookingsDbContext> options)
            : base(options)
        {
        }
        public DbSet<Business> Businesses { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {

            builder
                .Entity<Business>()
                .HasOne(b => b.User)
                .WithMany(u => u.Businesses)
                .HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            base.OnModelCreating(builder);
        }

    }
}
