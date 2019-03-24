using System.Collections.Generic;
using System.Threading.Tasks;
using eMusic.API.Models;

namespace eMusic.API.Repositories
{
    public class UserRepository
    {
        private readonly ApplicationContext applicationContext;

        public UserRepository(ApplicationContext applicationContext)
        {
            this.applicationContext = applicationContext;
        }

        public IEnumerable<User> GetAll()
        {
            return applicationContext.Users;
        }

        public async Task<User> GetById(int id)
        {
            return await applicationContext.Users.FindAsync(id);
        }

        public async Task<User> Create(User user)
        {
            var resultUser = await applicationContext.Users.AddAsync(user);
            await applicationContext.SaveChangesAsync();
            return resultUser.Entity;
        }

        public async Task<User> Update(User user)
        {
            var resultUser = applicationContext.Users.Update(user).Entity;
            await applicationContext.SaveChangesAsync();
            return resultUser;
        }

        public async Task<User> Delete(User user)
        {
            var resultUser = applicationContext.Remove(user).Entity;
            await applicationContext.SaveChangesAsync();
            return resultUser;
        }
    }
}
