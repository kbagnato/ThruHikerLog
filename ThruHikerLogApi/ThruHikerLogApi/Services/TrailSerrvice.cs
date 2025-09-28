using ThruHikerLogApi.Models;
using ThruHikerLogApi.Repos;

namespace ThruHikerLogApi.Services
{
    public class TrailSerrvice(TrailRepo trailRepo, EntryRepo entryRepo)
    {
        private readonly TrailRepo _trailRepo = trailRepo;
        private readonly EntryRepo _entryRepo = entryRepo;

        /// <summary>
        /// Create a new trail
        /// </summary>
        /// <param name="newTrail"></param>
        /// <param name="author"></param>
        public void CreateTrail(Trail newTrail, User? author)
        {
            _trailRepo.CreateTrail(newTrail, author);
        }

        /// <summary>
        /// Returns a hardcoded list of popular long-distance hiking trails in the United States.
        /// </summary>
        /// <returns>A list of Trails</returns>
        public IEnumerable<Trail> GetAllTrails()
        {
            return _trailRepo.GetTrails();
        }

        /// <summary>
        /// Gets the details for a specific trail, including its entries
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Trail GetTrailDetails(int id)
        {
            var trail = _trailRepo.GetTrailDetails(id);
            var entries = _entryRepo.GetEntriesByTrailId(id);
            trail.Entries = entries.ToList();
            return trail;
        }

        /// <summary>
        /// Delete a trail and all associated entries
        /// </summary>
        /// <param name="id"></param>
        public void DeleteTrail(int id)
        {
            _trailRepo.DeleteTrail(id);
        }
    }
}
