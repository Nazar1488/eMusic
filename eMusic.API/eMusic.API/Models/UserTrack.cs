namespace eMusic.API.Models
{
    public class UserTrack
    {
        public int UserId { get; set; }
        public int TrackId { get; set; }
        public Track Track { get; set; }
        public User User { get; set; }
    }
}
