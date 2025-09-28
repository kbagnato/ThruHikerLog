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
    }
}
