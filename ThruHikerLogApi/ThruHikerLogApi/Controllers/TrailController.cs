using Microsoft.AspNetCore.Mvc;
using ThruHikerLogApi.Models;
using ThruHikerLogApi.Services;

namespace ThruHikerLogApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TrailController(TrailSerrvice trailSerrvice) : ControllerBase
    {
        private readonly TrailSerrvice _trailSerrvice = trailSerrvice;

        [HttpGet]
        public IActionResult GetTrails()
        {
            var trails = _trailSerrvice.GetAllTrails();
            return Ok(trails);
        }

        [HttpPost]
        public IActionResult CreateTrail([FromBody] Trail trail)
        {
            // TODO get logged in user
            _trailSerrvice.CreateTrail(trail, null);
            return Ok();
        }

        [HttpGet("{id}")]
        public IActionResult GetTrailDetails([FromRoute] int id)
        {
            var trail = _trailSerrvice.GetTrailDetails(id);
            return Ok(trail);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTrail([FromRoute] int id)
        {
            _trailSerrvice.DeleteTrail(id);
            return Ok();
        }
    }
}
