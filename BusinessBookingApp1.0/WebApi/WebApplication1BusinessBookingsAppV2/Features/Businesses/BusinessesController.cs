using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1BusinessBookingsAppV2.Data;
using WebApplication1BusinessBookingsAppV2.Data.Models;
using WebApplication1BusinessBookingsAppV2.Features.Businesses;
using WebApplication1BusinessBookingsAppV2.Infrastructure;
using WebApplication1BusinessBookingsAppV2.Models.Businesses;

namespace WebApplication1BusinessBookingsAppV2.Controllers
{

    public class BusinessesController : ApiController
    {
        private readonly IBusinessService _businessService;

        public BusinessesController(IBusinessService businessService)
        {
            _businessService = businessService;
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult<IEnumerable<Business>>> Create(CreateBusinessRequest model)
        {
            var userId = this.User.GetId();

            var id = await this._businessService.Create(
                model.Name,
                model.Address,
                model.ImageUrl,
                model.WorkHoursStart,
                model.WorkHoursEnd,
                model.TimeSlotLength,
                userId
            );

            return Created(nameof(this.Create), id);
        }

        [Authorize]
        [HttpGet]
        public async Task<IEnumerable<BusinessViewModel>> MyBusiness()
        {
            var userId = this.User.GetId();

            return await this._businessService.MyBusinesses(userId);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<BusinessViewModel>> Details(int id)
        {
            var business = await this._businessService.GetBusiness(id);

            if (business == null)
            {
                return NotFound();
            }

            return business;
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult<BusinessViewModel>> Update(UpdateBusinessRequestModel model)
        {
            var userId = this.User.GetId();

            var updated = await this._businessService.UpdateBusiness(model.BusinessId,model.Name, model.Address, model.ImageUrl, userId);

            if (!updated)
            {
                return BadRequest();
            }

            return this.Ok();
        }

        [Authorize]
        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var userId = this.User.GetId();

            var updated = await this._businessService.DeleteBusiness(id, userId);

            if (!updated)
            {
                return BadRequest();
            }

            return this.Ok();
        }
    }
}
