#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BusinessBookingsApp.Data;
using BusinessBookingsApp.Models;
using BusinessBookingsApp.Models.ViewModels;

namespace BusinessBookingsApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusinessesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BusinessesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Businesses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BusinessViewModel>>> GetBusinesses()
        {
            return await _context.Businesses
                .Select(x => BusinessItemToVM(x))
                .ToListAsync();
        }

        // GET: api/Businesses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BusinessViewModel>> GetBusiness(int id)
        {
            var business = await _context.Businesses.FindAsync(id);

            if (business == null)
            {
                return NotFound();
            }

            return BusinessItemToVM(business);
        }

        // PUT: api/Businesses/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBusiness(int id, BusinessViewModel businessVM)
        {
            if (id != businessVM.BusinessId)
            {
                return BadRequest();
            }

            _context.Entry(businessVM).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BusinessExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Businesses
        [HttpPost]
        public async Task<ActionResult<BusinessViewModel>> PostBusiness(BusinessViewModel businessVM)
        {
            var businessItem = new Business
            {
                BusinessId = businessVM.BusinessId,
                Name = businessVM.Name,
                Address = businessVM.Address,
            };
            _context.Businesses.Add(businessItem);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBusiness", new { id = businessItem.BusinessId }, BusinessItemToVM(businessItem));
        }

        // DELETE: api/Businesses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBusiness(int id)
        {
            var business = await _context.Businesses.FindAsync(id);
            if (business == null)
            {
                return NotFound();
            }

            _context.Businesses.Remove(business);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BusinessExists(int id)
        {
            return _context.Businesses.Any(e => e.BusinessId == id);
        }

        public static BusinessViewModel BusinessItemToVM(Business business) =>
           new BusinessViewModel
           {
               BusinessId = business.BusinessId,
               Name = business.Name,
               Address = business.Address,
               Bookings = business.Bookings
           };
    }

}
