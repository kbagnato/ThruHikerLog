namespace ThruHikerLogApi.Models
{
    public class Entry
    {
        public int Id { get; set; }
        public int TrailId { get; set;  }
        public string Name { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public double StartMileage { get; set; }
        public double EndMileage { get; set; }
        public string Notes { get; set; }
    }
}
