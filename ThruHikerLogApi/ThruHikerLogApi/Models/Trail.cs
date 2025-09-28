namespace ThruHikerLogApi.Models
{
    public class Trail
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Length { get; set; }
        public string LengthType { get; set; } // e.g., "miles" or "nights"
        public string? Location { get; set; }
        public string? Description { get; set; }
        public string? GearListUrl { get; set; }
        public List<Entry>? Entries { get; set; }
    }
}
