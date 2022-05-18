using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SoapCore;
using WebApplication1BusinessBookingsAppV2.Data;
using WebApplication1BusinessBookingsAppV2.Features.Businesses;
using WebApplication1BusinessBookingsAppV2.Infrastructure;

namespace WebApplication1BusinessBookingsAppV2
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var appSettings = services.GetAppSettings(this.Configuration);

            services.AddDbContext<BusinessBookingsDbContext>(options =>
                options.UseSqlServer(
                    Configuration.GetDefaultConnectionString()))
                .AddIdentity()
                .AddJwtAuthentication(appSettings)
                .AddCustomAuthorizationPolicies(appSettings)
                .AddSoapCore()
                .AddApplicationServices()
                .AddEmailRemindersExternalService()
                .AddSwagger()
                .AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

            }

            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                options.RoutePrefix = string.Empty;

            });

            app.UseRouting();

            app.UseCors(x => x
               .AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader());

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
                endpoints.MapControllers();
            });

            app.UseEndpoints(endpoints =>
            {  
                endpoints.UseSoapEndpoint<BusinessService>("/BusinessService.asmx", new SoapEncoderOptions(), SoapSerializer.DataContractSerializer);
                endpoints.UseSoapEndpoint<BookingsService>("/BookingsService.asmx", new SoapEncoderOptions(), SoapSerializer.DataContractSerializer);
            });

            app.ApplyMigrations();
        }
    }
}
