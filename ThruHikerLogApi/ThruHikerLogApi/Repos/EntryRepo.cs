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
                SELECT Id, TrailId, Name, StartTime, EndTime, StartMileage, EndMileage, Notes 
                FROM Entries 
                WHERE TrailId = $trailId AND IsActive = 1
                ORDER BY StartTime DESC
            ";
            command.CommandType = System.Data.CommandType.Text;
            command.Parameters.AddWithValue("$trailId", trailId);
            using var reader = command.ExecuteReader();
            while (reader.Read())
            {
                var entry = ParseEntryFromReader(reader);
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
                INSERT INTO Entries (TrailId, Name, StartTime, EndTime, StartMileage, EndMileage, Notes)
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
            command.Parameters.AddWithValue("$isActive", 1);
            var newId = (long)command.ExecuteScalar();
            newEntry.Id = (int)newId;
            return newEntry;
        }

        public Entry GetEntryDetails(int entryId, int trailId)
        {
            var connectionString = "Data Source=thruhikerlog.db";
            using var connection = new SqliteConnection(connectionString);
            connection.Open();
            using var command = connection.CreateCommand();
            command.CommandText = @"
                SELECT Id, TrailId, Name, StartTime, EndTime, StartMileage, EndMileage, Notes 
                FROM Entries 
                WHERE Id = $entryId AND TrailId = $trailId AND IsActive = 1
            ";
            command.CommandType = System.Data.CommandType.Text;
            command.Parameters.AddWithValue("$entryId", entryId);
            command.Parameters.AddWithValue("$trailId", trailId);
            using var reader = command.ExecuteReader();
            if (reader.Read())
            {
                var entry = ParseEntryFromReader(reader);
                return entry;
            }
            throw new Exception($"Entry with id {entryId} and trailId {trailId} not found");
        }

        /// <summary>
        /// Updates an entry
        /// </summary>
        /// <param name="updatedEntry"></param>
        /// <returns></returns>
        public Entry UpdateEntry(int trailId, int entryId, Entry updatedEntry)
        {
            var connectionString = "Data Source=thruhikerlog.db";
            using var connection = new SqliteConnection(connectionString);
            connection.Open();
            using var command = connection.CreateCommand();
            command.CommandText = @"
                UPDATE Entries
                SET Name = $name,
                    StartTime = $startTime,
                    EndTime = $endTime,
                    StartMileage = $startMileage,
                    EndMileage = $endMileage,
                    Notes = $notes
                WHERE Id = $id AND trailId = $trailId
            ";
            command.CommandType = System.Data.CommandType.Text;
            command.Parameters.AddWithValue("$id", trailId);
            command.Parameters.AddWithValue("$trailId", entryId);
            command.Parameters.AddWithValue("$name", updatedEntry.Name ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("$startTime", updatedEntry.StartTime?.ToString("yyyy-MM-dd HH:mm:ss") ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("$endTime", updatedEntry.EndTime?.ToString("yyyy-MM-dd HH:mm:ss") ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("$startMileage", updatedEntry.StartMileage ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("$endMileage", updatedEntry.EndMileage ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("$notes", updatedEntry.Notes ?? (object)DBNull.Value);
            var rowsAffected = command.ExecuteNonQuery();
            if (rowsAffected == 0)
            {
                throw new Exception($"Entry with id {trailId} and trailId {entryId} not found");
            }
            updatedEntry.Id = trailId;
            updatedEntry.TrailId = entryId;
            return updatedEntry;
        }

        /// <summary>
        /// Deletes an entry
        /// </summary>
        /// <param name="entryId"></param>
        /// <exception cref="Exception"></exception>
        public void DeleteEntry(int entryId, int trailId)
        {
            var connectionString = "Data Source=thruhikerlog.db";
            using var connection = new SqliteConnection(connectionString);
            connection.Open();
            using var command = connection.CreateCommand();
            command.CommandText = @"
                UPDATE Entries 
                SET IsActive = 0
                WHERE Id = $entryId AND TrailId = $trailId
            ";
            command.CommandType = System.Data.CommandType.Text;
            command.Parameters.AddWithValue("$entryId", entryId);
            command.Parameters.AddWithValue("$trailId", trailId);
            var rowsAffected = command.ExecuteNonQuery();
            if (rowsAffected == 0)
            {
                throw new Exception($"Entry with id {entryId} not found");
            }
        }

        /// <summary>
        /// Parses an Entry object from a SqliteDataReader
        /// </summary>
        /// <param name="reader"></param>
        /// <returns></returns>
        public static Entry ParseEntryFromReader(SqliteDataReader reader)
        {
            var entry = new Entry
            {
                Id = reader.GetInt32(0),
                TrailId = reader.GetInt32(1),
                Name = reader.IsDBNull(2) ? null : reader.GetString(2),
                StartTime = reader.IsDBNull(3) ? null : DateTime.Parse(reader.GetString(3)),
                EndTime = reader.IsDBNull(4) ? null : DateTime.Parse(reader.GetString(4)),
                StartMileage = reader.IsDBNull(5) ? null : reader.GetDouble(5),
                EndMileage = reader.IsDBNull(6) ? null : reader.GetDouble(6),
                Notes = reader.IsDBNull(7) ? null : reader.GetString(7)
            };

            return entry;
            
        }
    }
}
