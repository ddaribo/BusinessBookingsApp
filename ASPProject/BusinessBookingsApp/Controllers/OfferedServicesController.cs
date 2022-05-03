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

namespace BusinessBookingsApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OfferedServicesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OfferedServicesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/OfferedServices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OfferedService>>> GetOfferedService()
        {
            return await _context.OfferedService.ToListAsync();
        }

        // GET: api/OfferedServices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OfferedService>> GetOfferedService(int id)
        {
            var offeredService = await _context.OfferedService.FindAsync(id);

            if (offeredService == null)
            {
                return NotFound();
            }

            return offeredService;
        }

        // PUT: api/OfferedServices/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOfferedService(int id, OfferedService offeredService)
        {
            if (id != offeredService.OfferedServiceId)
            {
                return BadRequest();
            }

            _context.Entry(offeredService).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OfferedServiceExists(id))
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

        // POST: api/OfferedServices
        [HttpPost]
        public async Task<ActionResult<OfferedService>> PostOfferedService(OfferedService offeredService)
        {
            _context.OfferedService.Add(offeredService);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOfferedService", new { id = offeredService.OfferedServiceId }, offeredService);
        }

        // DELETE: api/OfferedServices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOfferedService(int id)
        {
            var offeredService = await _context.OfferedService.FindAsync(id);
            if (offeredService == null)
            {
                return NotFound();
            }

            _context.OfferedService.Remove(offeredService);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OfferedServiceExists(int id)
        {
            return _context.OfferedService.Any(e => e.OfferedServiceId == id);
        }
    }
}
