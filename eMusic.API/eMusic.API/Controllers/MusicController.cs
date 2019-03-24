using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using eMusic.API.Models;
using eMusic.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace eMusic.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MusicController : ControllerBase
    {
        private readonly MusicService musicService;

        public MusicController(MusicService musicService)
        {
            this.musicService = musicService;
        }

        [HttpGet]
        [Route("all")]
        public IEnumerable<Track> All()
        {
            return musicService.GetAvailable();
        }

        [HttpDelete]
        [Route("removeAll")]
        public async Task<Track> RemoveById(int id)
        {
            return await musicService.RemoveById(id);
        }

        [HttpGet]
        [Route("track")]
        public async Task<ActionResult> Track(int id)
        {
            var track = await musicService.GetById(id);
            byte[] buffer;
            using (var fs = new FileStream(track.TrackPath, FileMode.Open, FileAccess.Read))
            {
                var br = new BinaryReader(fs);
                var numBytes = new FileInfo(track.TrackPath).Length;
                buffer = br.ReadBytes((int)numBytes);
            }

            return File(buffer, "audio/mpeg");
        }

        [HttpGet]
        [Route("image")]
        public async Task<ActionResult> Image(int id)
        {
            var track = await musicService.GetById(id);
            byte[] buffer;
            using (var fs = new FileStream(track.ImagePath, FileMode.Open, FileAccess.Read))
            {
                var br = new BinaryReader(fs);
                var numBytes = new FileInfo(track.TrackPath).Length;
                buffer = br.ReadBytes((int)numBytes);
            }

            return File(buffer, "image/jpeg");
        }

        [HttpPut]
        [Route("add")]
        public async Task<ActionResult> Add(Track track)
        {
            await musicService.Add(track);
            return Ok();
        }
    }
}