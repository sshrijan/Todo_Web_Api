using Microsoft.EntityFrameworkCore;
using TodoApp.Models;


namespace TodoApp.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Todo> Todos => Set<Todo>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Todo>()
            .Property(t => t.CreatedAt)
            .HasDefaultValueSql("GETUTCDATE()");
    }
}