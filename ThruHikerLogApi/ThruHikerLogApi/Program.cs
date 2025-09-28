using Microsoft.Data.Sqlite;
using ThruHikerLogApi.Repos;
using ThruHikerLogApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSingleton<TrailSerrvice, TrailSerrvice>();
builder.Services.AddSingleton<TrailRepo, TrailRepo>();
builder.Services.AddSingleton<EntryRepo, EntryRepo>();
builder.Services.AddSingleton<EntryService, EntryService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:4200")
                          .AllowAnyHeader()
                          .AllowAnyMethod());
                          //.AllowCredentials()); // If you are sending cookies or authentication headers
});

var app = builder.Build();

// ensure db and tables exist
using (var conn = new SqliteConnection("Data Source=thruhikerlog.db"))
{
    conn.Open();
    var tableCmd = conn.CreateCommand();
    tableCmd.CommandText = @"
        CREATE TABLE IF NOT EXISTS Trails (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            Name TEXT NOT NULL,
            Location TEXT,
            Length REAL,
            LengthType TEXT,
            Description TEXT,
            GearListUrl TEXT
        );
    ";
    tableCmd.ExecuteNonQuery();

    tableCmd.CommandText = @"
        CREATE TABLE IF NOT EXISTS DailyEntries (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            TrailId INTEGER NOT NULL,
            Name TEXT,
            StartTime DateTime,
            EndTime DATETIME,
            StartMileage DOUBLE, 
            EndMileage DOUBLE,
            Notes TEXT,
            FOREIGN KEY (TrailId) REFERENCES Trails(Id) ON DELETE CASCADE
        );
    ";
    tableCmd.ExecuteNonQuery();
    conn.Close();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("AllowSpecificOrigin");

app.MapControllers();

app.Run();
