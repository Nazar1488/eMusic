using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eMusic.API.Models;
using eMusic.API.Repositories;

namespace eMusic.API.Services
{
    public class MusicService
    {
        private readonly TrackRepository trackRepository;
        private readonly UserRepository userRepository;

        public MusicService(TrackRepository trackRepository, UserRepository userRepository)
        {
            this.trackRepository = trackRepository;
            this.userRepository = userRepository;
        }

        public IEnumerable<Track> GetAvailable()
        {
            return trackRepository.GetAll();
        }

        public async Task<Track> GetById(int id)
        {
            return await trackRepository.GetById(id);
        }

        public async Task<Track> Add(Track track)
        {
            return await trackRepository.Create(track);
        }

        public async Task<Track> RemoveById(int id)
        {
            var track = await trackRepository.GetById(id);
            return await trackRepository.Delete(track);
        }

        public async Task<IEnumerable<Track>> GetBuyTracks(int userId)
        {
            var result = new List<Track>();
            var user = await userRepository.GetById(userId);
            var buyUserTracks = user.UserTracks.Where(t => t.isBuy);
            foreach (var userUserTrack in buyUserTracks)
            {
                var track = await trackRepository.GetById(userUserTrack.TrackId);
                result.Add(track);
            }

            return result;
        }

        public async Task<IEnumerable<Track>> GetCartTracks(int userId)
        {
            var result = new List<Track>();
            var user = await userRepository.GetById(userId);
            var cartUserTracks = user.UserTracks.Where(t => !t.isBuy);
            foreach (var userUserTrack in cartUserTracks)
            {
                var track = await trackRepository.GetById(userUserTrack.TrackId);
                result.Add(track);
            }

            return result;
        }

        public async Task<User> AddTrackToCart(int userId, int trackId)
        {
            var track = await trackRepository.GetById(trackId);
            var user = await userRepository.GetById(userId);
            if (user.UserTracks.FirstOrDefault(u => u.TrackId == trackId) != null)
            {
                return null;
            }

            user.UserTracks.Add(new UserTrack {TrackId = track.Id, UserId = userId, isBuy = false });
            return await userRepository.Update(user);
        }

        public async Task<bool> RemoveFromCart(int userId, int trackId)
        {
            var user = await userRepository.GetById(userId);
            var userTrack = user.UserTracks.FirstOrDefault(t => t.UserId == userId && t.TrackId == trackId);
            if (userTrack == null) return false;
            var result = user.UserTracks.Remove(userTrack);
            await userRepository.Update(user);
            return result;
        }

        public async Task<User> BuyTrack(int userId, int trackId)
        {
            var user = await userRepository.GetById(userId);
            var track = await trackRepository.GetById(trackId);
            if (user.Balance < track.Cost)
            {
                return null;
            }

            if (user.UserTracks.FirstOrDefault(u => u.TrackId == trackId && u.isBuy) != null)
            {
                return null;
            }

            var userTrack = user.UserTracks.FirstOrDefault(t => t.UserId == userId && t.TrackId == trackId);
            if (userTrack == null) return null;
            user.UserTracks.Remove(userTrack);
            userTrack.isBuy = true;
            user.UserTracks.Add(userTrack);
            user.Balance -= track.Cost;
            await userRepository.Update(user);
            return user;
        }
    }
}
