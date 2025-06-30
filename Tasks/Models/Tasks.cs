public class TaskItem
{
    public int Id { get; set; }
    public string Titulo { get; set; }
    public string Description { get; set; }
    public DateTime DueDate { get; set; }
    public bool IsCompleted { get; set; }
    public int Priority { get; set; } // 1: Low, 2: Medium, 3: High
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
