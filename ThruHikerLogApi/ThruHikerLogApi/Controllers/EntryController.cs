using Microsoft.AspNetCore.Mvc;
using ThruHikerLogApi.Models;
using ThruHikerLogApi.Services;

namespace ThruHikerLogApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EntryController(EntryService entryService) : ControllerBase
    {
        private readonly EntryService _entryService = entryService;

        [HttpGet("trail/{trailId}")]
        public IActionResult GetEntriesForTrail([FromRoute] int trailId)
        {
            var entries = _entryService.GetEntriesForTrail(trailId);
            return Ok(entries);
        }

        [HttpPost]
        public IActionResult CreateEntry([FromBody] Entry entry)
        {
            var createdEntry = _entryService.CreateEntry(entry);
            return Ok(createdEntry);
        }

        [HttpGet("{entryId}/trail/{trailId}")]
        public IActionResult GetEntryDetails([FromRoute] int entryId, [FromRoute] int trailId)
        {
            var entries = _entryService.GetEntriesForTrail(trailId);
            var entry = entries.FirstOrDefault(e => e.Id == entryId);
            if (entry == null)
            {
                return NotFound();
            }
            return Ok(entry);
        }

        [HttpPut("{entryId}/trail/{trailId}")]
        public IActionResult UpdateEntry([FromRoute] int entryId, [FromRoute] int trailId, [FromBody] Entry entry)
        {
            _entryService.UpdateEntry(entryId, trailId, entry);
            return Ok();
        }

        [HttpDelete("{entryId}/trail/{trailId}")]
        public IActionResult DeleteEntry([FromRoute] int entryId, [FromRoute] int trailId)
        {
            _entryService.DeleteEntry(entryId, trailId);
            return Ok();
        }
    }
}
