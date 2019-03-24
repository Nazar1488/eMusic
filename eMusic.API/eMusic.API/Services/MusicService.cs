using System.Collections.Generic;
using System.Threading.Tasks;
using eMusic.API.Models;
using eMusic.API.Repositories;

namespace eMusic.API.Services
{
    public class MusicService
    {
        private readonly TrackRepository trackRepository;

        public MusicService(TrackRepository trackRepository)
        {
            this.trackRepository = trackRepository;
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
    }
}
