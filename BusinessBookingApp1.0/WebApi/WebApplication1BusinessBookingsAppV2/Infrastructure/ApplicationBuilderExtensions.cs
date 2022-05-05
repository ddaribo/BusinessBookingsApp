using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WebApplication1BusinessBookingsAppV2.Data;

namespace WebApplication1BusinessBookingsAppV2.Infrastructure
{
    public static class ApplicationBuilderExtensions
    {
        public static void ApplyMigrations(this IApplicationBuilder app)
        {
            using var services = app.ApplicationServices.CreateScope();

            var dbContext = services.ServiceProvider.GetService<BusinessBookingsDbContext>();

            dbContext.Database.Migrate();
        }
    }
}
