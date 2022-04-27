using BusinessBookingsApp.Models;
using BusinessBookingsApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BusinessBookingsApp.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class BusinessController : ControllerBase
{
    public IEnumerable<Business> Businesses { get; private set; }

    private readonly BusinessService _businessService;

    private readonly ILogger<BusinessController> _logger;

    public BusinessController(
        BusinessService businessService,
        ILogger<BusinessController> logger)
    {
        _businessService = businessService;
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<Business> Get()
    {
        return this.GetBusinesses().Result;
    }
    private async Task<IEnumerable<Business>> GetBusinesses()
    {
        Businesses = await _businessService.GetBusinesses();
        return Businesses;
    }
}
