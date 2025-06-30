import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskService } from '../../shared/services/task';

@Component({
  selector: 'app-task-edit',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './task-edit.html',
  styleUrl: './task-edit.css'
})
export class TaskEdit implements OnInit {
  task: Task | null = null;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    const taskId = Number(this.route.snapshot.paramMap.get('id'));

    if (taskId) {
      this.taskService.getTask(taskId).subscribe({
        next: (task) => {
          // Si por alguna razón dueDate ya es Date, convertimos a string
          if (task.dueDate instanceof Date) {
            task.dueDate = task.dueDate.toISOString().split('T')[0];
          } else if (typeof task.dueDate === 'string') {
            task.dueDate = task.dueDate.split('T')[0];
          }
          this.task = task;
        },
        error: (err) => console.error('Error al cargar la tarea', err)
      });
    }
  }

  updateTask(): void {
    if (!this.task) return;

    const updated = {
      ...this.task,
      updatedAt: new Date()
    }

    this.taskService.updateTask(this.task.id, updated).subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: (err) => console.error('Error al actualizar la tarea', err)
    });
  }

  cancel() {
    this.router.navigate(['/tasks']);
  }
}
