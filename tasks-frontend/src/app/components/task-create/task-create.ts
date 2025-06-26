import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskService } from '../../services/task';
import { Router } from '@angular/router';


@Component({
  selector: 'app-task-create',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-create.html',
  styleUrl: './task-create.css'
})

export class TaskCreate {
  task: Task = {
    id: 0,
    titulo: '',
    description: '',
    isCompleted: false,
    dueDate: new Date(),
    priority: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  constructor(private taskService: TaskService, private router: Router) { }

  createTask() {
    this.task.createdAt = new Date();
    this.task.updatedAt = new Date();

    this.taskService.createTask(this.task).subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: (err) => console.error('Error creando la tarea', err)
    });
  }
}
