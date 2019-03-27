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
        [Route("cart")]
        public ActionResult<IEnumerable<Track>> Cart(int userId)
        {
            return Ok(musicService.GetCartTracks(userId).Result);
        }

        [HttpGet]
        [Route("myTracks")]
        public async Task<IEnumerable<Track>> MyTracks(int userId)
        {
            return await musicService.GetBuyTracks(userId);
        }

        [HttpPost]
        [Route("addToCart")]
        public async Task<User> AddToCart(UserTrackRequest request)
        {
            return await musicService.AddTrackToCart(request.UserId, request.TrackId);
        }

        [HttpPost]
        [Route("removeFromCart")]
        public async Task<bool> RemoveFromCart(UserTrackRequest request)
        {
            return await musicService.RemoveFromCart(request.UserId, request.TrackId);
        }

        [HttpPost]
        [Route("buy")]
        public async Task<User> Buy(UserTrackRequest request)
        {
            return await musicService.BuyTrack(request.UserId, request.TrackId);
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