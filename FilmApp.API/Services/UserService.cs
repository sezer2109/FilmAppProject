using FilmApp.API.Models;
using System.Collections.Generic;
using System.Linq;

namespace FilmApp.API.Services
{
    public static class UserService
    {
        public static List<User> Users = new List<User>()
        {
            new User { Username = "filmUser", Password = "1234", Role = "film" },
            new User { Username = "actorUser", Password = "1234", Role = "actor" },
            new User { Username = "adminUser", Password = "1234", Role = "admin" }
        };

        public static User? Authenticate(string username, string password)
        {
            return Users.SingleOrDefault(u => u.Username == username && u.Password == password);
        }
    }
}
