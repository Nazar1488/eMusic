using System.Collections.Generic;
using System.Threading.Tasks;
using eMusic.API.Models;

namespace eMusic.API.Repositories
{
    public class TrackRepository
    {
        private readonly ApplicationContext applicationContext;

        public TrackRepository(ApplicationContext applicationContext)
        {
            this.applicationContext = applicationContext;
        }

        public IEnumerable<Track> GetAll()
        {
            return applicationContext.Tracks;
        }

        public async Task<Track> GetById(int id)
        {
            return await applicationContext.Tracks.FindAsync(id);
        }

        public async Task<Track> Create(Track track)
        {
            var resultTrack = await applicationContext.Tracks.AddAsync(track);
            await applicationContext.SaveChangesAsync();
            return resultTrack.Entity;
        }

        public async Task<Track> Update(Track track)
        {
            var resultTrack = applicationContext.Tracks.Update(track).Entity;
            await applicationContext.SaveChangesAsync();
            return resultTrack;
        }

        public async Task<Track> Delete(Track track)
        {
            var resultTrack = applicationContext.Tracks.Remove(track).Entity;
            await applicationContext.SaveChangesAsync();
            return resultTrack;
        }
    }
}
