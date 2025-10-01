using Microsoft.Data.Sqlite;
using ThruHikerLogApi.Models;

namespace ThruHikerLogApi.Repos
{
    public class TrailRepo
    {
        /// <summary>
        /// Returns all trails
        /// </summary>
        /// <returns>All trails</returns>
        public IEnumerable<Trail> GetTrails()
        {
            var trails = new List<Trail>();
            var connectionString = "Data Source=thruhikerlog.db";
            using var connection = new SqliteConnection(connectionString);
            connection.Open();
            using var command = connection.CreateCommand();
            command.CommandText = "SELECT Id, Name, Location, Length, LengthType, Description, GearListUrl, StartDate, EndDate FROM Trails WHERE IsActive = 1";
            command.CommandType = System.Data.CommandType.Text;
            using var reader = command.ExecuteReader();
            while (reader.Read())
            {
                var trail = MapTrailFromReader(reader);
                trails.Add(trail);
            }

            return trails;
        }


        /// <summary>
        /// Add a trail to the list
        /// </summary>
        /// <param name="newTrail"></param>
        /// <param name="author"></param>
        public Trail CreateTrail(Trail newTrail, User? author)
        {
            var connectionString = "Data Source=thruhikerlog.db";
            using var connection = new SqliteConnection(connectionString);
            connection.Open();
            using var command = connection.CreateCommand();
            command.CommandText = @"
                INSERT INTO Trails (Name, Location, Length, LengthType, Description, GearListUrl, StartDate, EndDate, IsActive)
                VALUES ($name, $location, $length, $lengthType, $description, $gearListUrl, $startDate, $endDate, 1);
                SELECT last_insert_rowid();
            ";
            command.CommandType = System.Data.CommandType.Text;
            command.Parameters.AddWithValue("$name", newTrail.Name);
            command.Parameters.AddWithValue("$location", (object?)newTrail.Location ?? DBNull.Value);
            command.Parameters.AddWithValue("$length", newTrail.Length);
            command.Parameters.AddWithValue("$lengthType", (object?)newTrail.LengthType ?? DBNull.Value);
            command.Parameters.AddWithValue("$description", (object?)newTrail.Description ?? DBNull.Value);
            command.Parameters.AddWithValue("$gearListUrl", (object?)newTrail.GearListUrl ?? DBNull.Value);
            command.Parameters.AddWithValue("$startDate", (object?)newTrail.StartDate?.ToString("yyyy-MM-dd") ?? DBNull.Value);
            command.Parameters.AddWithValue("$endDate", (object?)newTrail.EndDate?.ToString("yyyy-MM-dd") ?? DBNull.Value);
            command.Parameters.AddWithValue("$isActive", 1);
            var newId = (long)command.ExecuteScalar();
            newTrail.Id = (int)newId;
            connection.Close();
            return newTrail;
        }

        /// <summary>
        /// Gets details for a specific trail by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>trail</returns>
        /// <exception cref="Exception"></exception>
        public Trail GetTrailDetails(int id)
        {
            Trail? trail = null;
            var connectionString = "Data Source=thruhikerlog.db";
            using var connection = new SqliteConnection(connectionString);
            connection.Open();
            using var command = connection.CreateCommand();
            command.CommandText = "SELECT Id, Name, Location, Length, LengthType, Description, GearListUrl, StartDate, EndDate FROM Trails WHERE Id = $id AND IsActive = 1";
            command.CommandType = System.Data.CommandType.Text;
            command.Parameters.AddWithValue("$id", id);
            using var reader = command.ExecuteReader();
            if (reader.Read())
            {
                trail = MapTrailFromReader(reader);
            }
            return trail ?? throw new Exception($"Trail with id {id} not found");
        }

        public Trail UpdateTrail(int id, Trail updatedTrail)
        {
            var connectionString = "Data Source=thruhikerlog.db";
            using var connection = new SqliteConnection(connectionString);
            connection.Open();
            using var command = connection.CreateCommand();
            command.CommandText = @"
                UPDATE Trails
                SET Name = $name,
                    Location = $location,
                    Length = $length,
                    LengthType = $lengthType,
                    Description = $description,
                    GearListUrl = $gearListUrl,
                    StartDate = $startDate,
                    EndDate = $endDate
                WHERE Id = $id
            ";
            command.CommandType = System.Data.CommandType.Text;
            command.Parameters.AddWithValue("$id", id);
            command.Parameters.AddWithValue("$name", updatedTrail.Name);
            command.Parameters.AddWithValue("$location", (object?)updatedTrail.Location ?? DBNull.Value);
            command.Parameters.AddWithValue("$length", updatedTrail.Length);
            command.Parameters.AddWithValue("$lengthType", (object?)updatedTrail.LengthType ?? DBNull.Value);
            command.Parameters.AddWithValue("$description", (object?)updatedTrail.Description ?? DBNull.Value);
            command.Parameters.AddWithValue("$gearListUrl", (object?)updatedTrail.GearListUrl ?? DBNull.Value);
            command.Parameters.AddWithValue("$startDate", (object?)updatedTrail.StartDate?.ToString("yyyy-MM-dd") ?? DBNull.Value);
            command.Parameters.AddWithValue("$endDate", (object?)updatedTrail.EndDate?.ToString("yyyy-MM-dd") ?? DBNull.Value);
            var rowsAffected = command.ExecuteNonQuery();
            if (rowsAffected == 0)
            {
                throw new Exception($"Trail with id {id} not found");
            }
            connection.Close();
            updatedTrail.Id = id;
            return updatedTrail;
        }

        /// <summary>
        /// Deletes a trail by id
        /// </summary>
        /// <param name="id"></param>
        /// <exception cref="Exception"></exception>
        public void DeleteTrail(int id)
        {
            var connectionString = "Data Source=thruhikerlog.db";
            using var connection = new SqliteConnection(connectionString);
            connection.Open();
            using var command = connection.CreateCommand();
            command.CommandText = "UPDATE Trails SET IsActive = 0 WHERE Id = $id";
            command.CommandType = System.Data.CommandType.Text;
            command.Parameters.AddWithValue("$id", id);
            var rowsAffected = command.ExecuteNonQuery();
            if (rowsAffected == 0)
            {
                throw new Exception($"Trail with id {id} not found");
            }
            connection.Close();
        }

        private static Trail MapTrailFromReader(SqliteDataReader reader)
        {
            return new Trail
            {
                Id = reader.GetInt32(0),
                Name = reader.GetString(1),
                Location = reader.IsDBNull(2) ? null : reader.GetString(2),
                Length = reader.IsDBNull(3) ? 0 : reader.GetDouble(3),
                LengthType = reader.IsDBNull(4) ? null : reader.GetString(4),
                Description = reader.IsDBNull(5) ? null : reader.GetString(5),
                GearListUrl = reader.IsDBNull(6) ? null : reader.GetString(6),
                StartDate = reader.IsDBNull(7) ? null : DateTime.Parse(reader.GetString(7)),
                EndDate = reader.IsDBNull(8) ? null : DateTime.Parse(reader.GetString(8))
            };
        }
    }
}
