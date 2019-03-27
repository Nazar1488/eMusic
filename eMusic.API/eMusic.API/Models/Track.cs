using System.Collections.Generic;
using Newtonsoft.Json;

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

        [JsonIgnore]
        public List<UserTrack> UserTracks { get; set; }
    }
}
