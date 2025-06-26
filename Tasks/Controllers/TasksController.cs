
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _context;

    public TasksController(AppDbContext context)
    {
        _context = context;
    }

    // get all tasks
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Task>>> GetTasks()
    {
        return await _context.Tasks.ToListAsync();
    }

    // get task by id
    [HttpGet("{id}")]
    public async Task<ActionResult<Task>> GetTask(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null)
        {
            return NotFound();
        }
        return task;
    }

    // create a new task
    [HttpPost]
    public async Task<ActionResult<Task>> CreateTask(Task task)
    {
        task.CreatedAt = DateTime.UtcNow;
        task.UpdatedAt = DateTime.UtcNow;
        task.IsCompleted = false;
        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
    }

    // update an existing task
    [HttpPut("{id}")]
    public async Task<IActionResult> PutTask(int id, Task task)
    {

        if (id != task.Id)
        {
            return BadRequest();
        }

        var existingTask = await _context.Tasks.FindAsync(id);
        if (existingTask == null)
        {
            return NotFound();
        }



        try
        {


            // Actualizamos los campos necesarios
            existingTask.Titulo = task.Titulo;
            existingTask.Description = task.Description;
            existingTask.DueDate = task.DueDate;
            existingTask.IsCompleted = task.IsCompleted;
            existingTask.Priority = task.Priority;
            existingTask.UpdatedAt = DateTime.UtcNow;

            _context.Entry(existingTask).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(existingTask);

        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TaskExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // delete a task
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null)
        {
            return NotFound();
        }
        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();
        return NoContent();
    }


    private bool TaskExists(int id)
    {
        return _context.Tasks.Any(e => e.Id == id);
    }
}

