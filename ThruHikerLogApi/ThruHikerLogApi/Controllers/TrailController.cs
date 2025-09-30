using Microsoft.AspNetCore.Mvc;
using ThruHikerLogApi.Models;
using ThruHikerLogApi.Services;

namespace ThruHikerLogApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TrailController(TrailService trailService) : ControllerBase
    {
        private readonly TrailService _trailService = trailService;

        [HttpGet]
        public IActionResult GetTrails()
        {
            var trails = _trailService.GetAllTrails();
            return Ok(trails);
        }

        [HttpPost]
        public IActionResult CreateTrail([FromBody] Trail trail)
        {
            // TODO get logged in user
            _trailService.CreateTrail(trail, null);
            return Ok();
        }

        [HttpGet("{id}")]
        public IActionResult GetTrailDetails([FromRoute] int id)
        {
            var trail = _trailService.GetTrailDetails(id);
            return Ok(trail);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTrail([FromRoute] int id, [FromBody] Trail updatedTrail)
        {
            _trailService.UpdateTrail(id, updatedTrail);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTrail([FromRoute] int id)
        {
            _trailService.DeleteTrail(id);
            return Ok();
        }
    }
}
