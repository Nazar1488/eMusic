using System;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using eMusic.API.Models;
using eMusic.API.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace eMusic.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly MusicService musicService;
        private readonly IHostingEnvironment hostingEnvironment;

        public AdminController(MusicService musicService, IHostingEnvironment hostingEnvironment)
        {
            this.musicService = musicService;
            this.hostingEnvironment = hostingEnvironment;
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
    }
}