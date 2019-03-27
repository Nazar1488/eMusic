using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace eMusic.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string ExternalId { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public decimal Balance { get; set; }
        public UserRole Role { get; set; }

        [JsonIgnore]
        public List<UserTrack> UserTracks { get; set; }
    }
}
