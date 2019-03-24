using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using eMusic.API.Models;
using eMusic.API.Repositories;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace eMusic.API.Services
{
    public class UserService
    {
        private readonly UserRepository userRepository;
        private readonly AppSettings appSettings;

        public UserService(UserRepository userRepository, IOptions<AppSettings> appSettings)
        {
            this.userRepository = userRepository;
            this.appSettings = appSettings.Value;
        }

        public UserResponse Login(LoginModel loginModel)
        {
            var user = userRepository.GetAll().FirstOrDefault(u => u.Email == loginModel.Email && u.Password == loginModel.Password);
            return user == null ? null : GenerateResponse(user);
        }

        public UserResponse FacebookLogin(FacebookLoginModel loginModel)
        {
            var user = userRepository.GetAll().FirstOrDefault(u => u.ExternalId != null && u.ExternalId == loginModel.UserId);
            return user == null ? null : GenerateResponse(user);
        }

        public async Task<UserResponse> FacebookRegister(FacebookRegisterModel registerModel)
        {
            var user = userRepository.GetAll().FirstOrDefault(u => u.Email == registerModel.Email);
            if (user != null)
            {
                user.ExternalId = registerModel.UserId;
                user = await userRepository.Update(user);
            }
            else
            {
                user = await userRepository.Create(new User
                {
                    ExternalId = registerModel.UserId,
                    DateOfBirth = registerModel.DateOfBirth,
                    FirstName = registerModel.FirstName,
                    LastName = registerModel.LastName,
                    Email = registerModel.Email,
                    Password = registerModel.Password,
                    Balance = 100,
                    Role = UserRole.User
                });
            }

            return GenerateResponse(user);
        }

        public async Task<UserResponse> Register(RegisterModel registerModel)
        {
            var user = userRepository.GetAll().FirstOrDefault(u => u.Email == registerModel.Email);
            if (user != null)
            {
                return null;
            }

            user = await userRepository.Create(new User
            {
                DateOfBirth = registerModel.DateOfBirth,
                FirstName = registerModel.FirstName,
                LastName = registerModel.LastName,
                Email = registerModel.Email,
                Password = registerModel.Password,
                Balance = 100,
                Role = UserRole.User
            });

            return GenerateResponse(user);
        }

        private UserResponse GenerateResponse(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return new UserResponse
            {
                DateOfBirth = user.DateOfBirth,
                Email = user.Email,
                FirstName = user.FirstName,
                Id = user.Id,
                LastName = user.LastName,
                Token = tokenHandler.WriteToken(token)
            };
        }
    }
}
