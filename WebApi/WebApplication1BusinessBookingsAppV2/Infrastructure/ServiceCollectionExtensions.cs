using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Net.Http;
using System.Text;
using WebApplication1BusinessBookingsAppV2.Data;
using WebApplication1BusinessBookingsAppV2.Data.Models;
using WebApplication1BusinessBookingsAppV2.Features.Businesses;
using WebApplication1BusinessBookingsAppV2.Features.Identity;

namespace WebApplication1BusinessBookingsAppV2.Infrastructure
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddIdentity(this IServiceCollection services)
        {
            services.AddIdentity<User, IdentityRole>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
            })
               .AddEntityFrameworkStores<BusinessBookingsDbContext>();

            return services;
        }

        public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, AppSettings appSettings)
        {
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            return services;
        }

        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
            => services.AddTransient<IIdentityService, IdentityService>()
                        .AddTransient<IBusinessService, BusinessService>()
                       .AddTransient<IBookingService, BookingsService>();

        public static IServiceCollection AddSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc(
                    "v1",
                    new OpenApiInfo
                    {
                        Title = "BusinessBookings App API",
                        Version = "v1"
                    });
            });
            return services;
        }

        public static IServiceCollection AddEmailRemindersExternalService(this IServiceCollection services)
        {
            services.AddHttpClient("emailReminders", (HttpClient client) =>
            {
                client.BaseAddress = new System.Uri("http://localhost:3000");
            }).ConfigureHttpClient((HttpClient client) => { })
              .ConfigureHttpClient((IServiceProvider provider, HttpClient client) => { });
            return services;
        }

        public static IServiceCollection AddCustomAuthorizationPolicies(this IServiceCollection services, AppSettings appSettings)
        {
            services.AddAuthorization(options =>
            {
                options.AddPolicy("IsAdminUser",
                policyBuilder => policyBuilder.RequireUserName(appSettings.AdminName));
            });
            return services;
        }
    }
}
