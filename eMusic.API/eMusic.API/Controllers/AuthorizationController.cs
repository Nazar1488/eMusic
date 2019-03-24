using System.Threading.Tasks;
using eMusic.API.Models;
using eMusic.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace eMusic.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        private readonly UserService userService;

        public AuthorizationController(UserService userService)
        {
            this.userService = userService;
        }

        [HttpPost]
        [Route("login")]
        public ActionResult<UserResponse> Login(LoginModel loginModel)
        {
            var user = userService.Login(loginModel);
            if (user == null)
            {
                return BadRequest("Invalid email or password");
            }

            return user;
        }

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult<UserResponse>> Register(RegisterModel registerModel)
        {
            var user = await userService.Register(registerModel);
            if (user == null)
            {
                return BadRequest("User with this email already registered");
            }

            return user;
        }

        [HttpPost]
        [Route("facebookLogin")]
        public ActionResult<UserResponse> FacebookLogin(FacebookLoginModel loginModel)
        {
            var user = userService.FacebookLogin(loginModel);
            return user;
        }

        [HttpPost]
        [Route("facebookRegister")]
        public async Task<ActionResult<UserResponse>> FacebookRegister(FacebookRegisterModel registerModel)
        {
            var user = await userService.FacebookRegister(registerModel);
            return user;
        }
    }
}