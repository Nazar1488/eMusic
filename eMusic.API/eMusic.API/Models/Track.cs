using System.Collections.Generic;

namespace eMusic.API.Models
{
    public class Track
    {
        public int Id { get; set; }
        public string Artist { get; set; }
        public string Title { get; set; }
        public string TrackPath { get; set; }
        public string ImagePath { get; set; }
        public decimal Cost { get; set; }
        public IEnumerable<UserTrack> UserTracks { get; set; }
    }
}
