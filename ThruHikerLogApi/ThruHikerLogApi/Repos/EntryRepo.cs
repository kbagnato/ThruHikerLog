using Microsoft.Data.Sqlite;
using ThruHikerLogApi.Models;

namespace ThruHikerLogApi.Repos
{
    public class EntryRepo
    {

        /// <summary>
        /// Gets all entries for a specific trail
        /// </summary>
        /// <param name="trailId"></param>
        /// <returns>list of entries</returns>
        public IEnumerable<Entry> GetEntriesByTrailId(int trailId)
        {
            var entries = new List<Entry>();
            var connectionString = "Data Source=thruhikerlog.db";
            using var connection = new SqliteConnection(connectionString);
            connection.Open();
            using var command = connection.CreateCommand();
            command.CommandText = @"
                SELECT Id, TrailId, StartTime, EndTime, StartMileage, EndMileage, Notes 
                FROM DailyEntries 
                WHERE TrailId = $trailId
                ORDER BY StartTime DESC
            ";
            command.CommandType = System.Data.CommandType.Text;
            command.Parameters.AddWithValue("$trailId", trailId);
            using var reader = command.ExecuteReader();
            while (reader.Read())
            {
                var entry = new Entry
                {
                    Id = reader.GetInt32(0),
                    TrailId = reader.GetInt32(1),
                    StartTime = reader.IsDBNull(2) ? DateTime.MinValue : reader.GetDateTime(2),
                    EndTime = reader.IsDBNull(3) ? DateTime.MinValue : reader.GetDateTime(3),
                    StartMileage = reader.IsDBNull(4) ? 0 : reader.GetDouble(4),
                    EndMileage = reader.IsDBNull(5) ? 0 : reader.GetDouble(5),
                    Notes = reader.IsDBNull(6) ? null : reader.GetString(6)
                };
                entries.Add(entry);
            }
            return entries;
        }

        /// <summary>
        /// Creates a new entry
        /// </summary>
        /// <param name="newEntry"></param>
        /// <returns>the new entry</returns>
        public Entry CreateEntry(Entry newEntry)
        {
            var connectionString = "Data Source=thruhikerlog.db";
            using var connection = new SqliteConnection(connectionString);
            connection.Open();
            using var command = connection.CreateCommand();
            command.CommandText = @"
                INSERT INTO DailyEntries (TrailId, Name, StartTime, EndTime, StartMileage, EndMileage, Notes)
                VALUES ($trailId, $name, $startTime, $endTime, $startMileage, $endMileage, $notes);
                SELECT last_insert_rowid();
            ";
            command.CommandType = System.Data.CommandType.Text;
            command.Parameters.AddWithValue("$trailId", newEntry.TrailId);
            command.Parameters.AddWithValue("$name", newEntry.Name);
            command.Parameters.AddWithValue("$startTime", newEntry.StartTime);
            command.Parameters.AddWithValue("$endTime", newEntry.EndTime);
            command.Parameters.AddWithValue("$startMileage", newEntry.StartMileage);
            command.Parameters.AddWithValue("$endMileage", newEntry.EndMileage);
            command.Parameters.AddWithValue("$notes", (object?)newEntry.Notes ?? DBNull.Value);
            var newId = (long)command.ExecuteScalar();
            newEntry.Id = (int)newId;
            return newEntry;
        }
    }
}
