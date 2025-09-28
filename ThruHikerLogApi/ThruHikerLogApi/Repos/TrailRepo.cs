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
            command.CommandText = "SELECT Id, Name, Location, Length, LengthType, Description, GearListUrl FROM Trails";
            command.CommandType = System.Data.CommandType.Text;
            using var reader = command.ExecuteReader();
            while (reader.Read())
            {
                var trail = new Trail
                {
                    Id = reader.GetInt32(0),
                    Name = reader.GetString(1),
                    Location = reader.IsDBNull(2) ? null : reader.GetString(2),
                    Length = reader.IsDBNull(3) ? 0 : reader.GetDouble(3),
                    LengthType = reader.IsDBNull(4) ? null : reader.GetString(4),
                    Description = reader.IsDBNull(5) ? null : reader.GetString(5),
                    GearListUrl = reader.IsDBNull(6) ? null : reader.GetString(6)
                };
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
                INSERT INTO Trails (Name, Location, Length, LengthType, Description, GearListUrl)
                VALUES ($name, $location, $length, $lengthType, $description, $gearListUrl);
                SELECT last_insert_rowid();
            ";
            command.CommandType = System.Data.CommandType.Text;
            command.Parameters.AddWithValue("$name", newTrail.Name);
            command.Parameters.AddWithValue("$location", (object?)newTrail.Location ?? DBNull.Value);
            command.Parameters.AddWithValue("$length", newTrail.Length);
            command.Parameters.AddWithValue("$lengthType", (object?)newTrail.LengthType ?? DBNull.Value);
            command.Parameters.AddWithValue("$description", (object?)newTrail.Description ?? DBNull.Value);
            command.Parameters.AddWithValue("$gearListUrl", (object?)newTrail.GearListUrl ?? DBNull.Value);
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
            command.CommandText = "SELECT Id, Name, Location, Length, LengthType, Description, GearListUrl FROM Trails WHERE Id = $id";
            command.CommandType = System.Data.CommandType.Text;
            command.Parameters.AddWithValue("$id", id);
            using var reader = command.ExecuteReader();
            if (reader.Read())
            {
                trail = new Trail
                {
                    Id = reader.GetInt32(0),
                    Name = reader.GetString(1),
                    Location = reader.IsDBNull(2) ? null : reader.GetString(2),
                    Length = reader.IsDBNull(3) ? 0 : reader.GetDouble(3),
                    LengthType = reader.IsDBNull(4) ? null : reader.GetString(4),
                    Description = reader.IsDBNull(5) ? null : reader.GetString(5),
                    GearListUrl = reader.IsDBNull(6) ? null : reader.GetString(6)
                };
            }
            return trail ?? throw new Exception($"Trail with id {id} not found");
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
            command.CommandText = "DELETE FROM Trails WHERE Id = $id";
            command.CommandType = System.Data.CommandType.Text;
            command.Parameters.AddWithValue("$id", id);
            var rowsAffected = command.ExecuteNonQuery();
            if (rowsAffected == 0)
            {
                throw new Exception($"Trail with id {id} not found");
            }
            connection.Close();
        }
    }
}
