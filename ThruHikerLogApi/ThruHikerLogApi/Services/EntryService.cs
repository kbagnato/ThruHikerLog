using ThruHikerLogApi.Repos;
using ThruHikerLogApi.Models;

namespace ThruHikerLogApi.Services
{
    public class EntryService(EntryRepo entryRepo)
    {
        private readonly EntryRepo _entryRepo = entryRepo;

        /// <summary>
        /// Gets all entries for a specific trail
        /// </summary>
        /// <param name="trailId"></param>
        /// <returns></returns>
        public IEnumerable<Entry> GetEntriesForTrail(int trailId)
        {
            return _entryRepo.GetEntriesByTrailId(trailId);
        }

        /// <summary>
        /// Creates a new entry
        /// </summary>
        /// <param name="entry"></param>
        /// <returns></returns>
        public Entry CreateEntry(Entry entry)
        {
            return _entryRepo.CreateEntry(entry);
        }

        public Entry GetEntryDetails(int entryId, int trailId)
        {
            return _entryRepo.GetEntryDetails(entryId, trailId);
        }

        /// <summary>
        /// Updates an entry
        /// </summary>
        /// <param name="entry"></param>
        public void UpdateEntry(int entryId, int trailId, Entry entry)
        {
            _entryRepo.UpdateEntry(entryId, trailId, entry);
        }

        /// <summary>
        /// Updates an entry
        /// </summary>
        /// <param name="id"></param>
        public void DeleteEntry(int entryId, int trailId)
        {
            _entryRepo.DeleteEntry(entryId, trailId);
        }
    }
}
