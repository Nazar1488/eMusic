using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

namespace eMusic.API.Models
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Track> Tracks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserTrack>().HasKey(t => new {t.TrackId, t.UserId});

            modelBuilder.Entity<UserTrack>().HasOne(ut => ut.Track).WithMany(t => t.UserTracks)
                .HasForeignKey(k => k.TrackId);

            modelBuilder.Entity<UserTrack>().HasOne(ut => ut.User).WithMany(t => t.UserTracks)
                .HasForeignKey(k => k.UserId);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=.;Initial Catalog=eMusic;Integrated Security=True;");
        }
    }
}
