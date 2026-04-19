using Microsoft.EntityFrameworkCore;
using TodoApp.Data;
using TodoApp.Models;
using TodoApp.Services;

namespace TodoApi.Services;

public class TodoService : ITodoService
{
    private readonly AppDbContext _context;

    public TodoService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Todo>> GetAllAsync()
    {
        return await _context.Todos
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();
    }

    public async Task<Todo?> GetByIdAsync(int id)
    {
        return await _context.Todos.FindAsync(id);
    }

  
    public async Task<Todo> CreateAsync(Todo todo)
    {
       
        if (string.IsNullOrWhiteSpace(todo.Title))
            throw new ArgumentException("Title is required");

        _context.Todos.Add(todo);
        await _context.SaveChangesAsync();
        return todo;
    }

    
    public async Task<bool> UpdateAsync(int id, Todo updatedTodo)
    {
        if (id != updatedTodo.Id)
            return false;

        var todo = await _context.Todos.FindAsync(id);
        if (todo == null)
            return false;

        todo.Title = updatedTodo.Title;
        todo.Description = updatedTodo.Description;   
        todo.IsCompleted = updatedTodo.IsCompleted;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var todo = await _context.Todos.FindAsync(id);
        if (todo == null)
            return false;

        _context.Todos.Remove(todo);
        await _context.SaveChangesAsync();
        return true;
    }
}