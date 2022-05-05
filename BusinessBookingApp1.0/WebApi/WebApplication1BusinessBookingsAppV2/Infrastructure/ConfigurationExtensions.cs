using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace WebApplication1BusinessBookingsAppV2.Infrastructure
{
    public static class ConfigurationExtensions
    {
        public static string GetDefaultConnectionString(this IConfiguration configuration)
            => configuration.GetConnectionString("DefaultConnection");

        public static AppSettings GetAppSettings(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            var appSettingsSectionConfiguration = configuration.GetSection("ApplicationSettings");
            services.Configure<AppSettings>(appSettingsSectionConfiguration);
            var appSettings = appSettingsSectionConfiguration.Get<AppSettings>();
            return appSettings;
        }
    }
}
