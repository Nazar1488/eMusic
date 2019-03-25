using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using eMusic.API.Models;
using eMusic.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace eMusic.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly MusicService musicService;
        private readonly UserService userService;

        public AdminController(MusicService musicService, UserService userService)
        {
            this.musicService = musicService;
            this.userService = userService;
        }

        [HttpPost]
        [DisableRequestSizeLimit]
        [Route("upload")]
        public async Task<ActionResult> UploadFiles()
        {
            var track = new Track();
            try
            {
                var folderName = Path.Combine("Resources", "Uploads");
                var pathToSave = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, folderName);

                foreach (var formFile in Request.Form.Files)
                {
                    if (formFile.Length <= 0) continue;
                    var fileName = ContentDispositionHeaderValue.Parse(formFile.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    switch (formFile.Name)
                    {
                        case "audio":
                            track.TrackPath = fullPath;
                            break;
                        case "image":
                            track.ImagePath = fullPath;
                            break;
                    }

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        formFile.CopyTo(stream);
                    }
                }

                track.Title = Request.Form["title"];
                track.Artist = Request.Form["artist"];
                track.Cost = decimal.Parse(Request.Form["cost"]);
                await musicService.Add(track);
                return Ok();

            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet]
        [Route("users")]
        public IEnumerable<User> Users()
        {
            return userService.GetAll();
        }

        [HttpPost]
        [Route("updateUser")]
        public async Task<ActionResult> UpdateUser(User user)
        {
            await userService.UpdateUser(user);
            return Ok();
        }

        [HttpPost]
        [Route("removeUser")]
        public async Task<ActionResult> RemoveUser(User user)
        {
            await userService.RemoveUser(user);
            return Ok();
        }
    }
}