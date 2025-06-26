import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../../services/task';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  searchId: number | null = null;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
      this.filteredTasks = data;
    })
  }

  filterTasks() {
    if (!this.searchId) {
      this.filteredTasks = this.tasks;
      return;
    }
    this.filteredTasks = this.tasks.filter(task => task.id === this.searchId);
  }


  updateTask(task: Task) {
    const updatedTask = {
      ...task,
      isCompleted: !task.isCompleted,
      updatedAt: new Date()
    };

    this.taskService.updateTask(task.id, updatedTask).subscribe({
      next: (response) => {
        const index = this.tasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
          this.tasks[index] = response;
        }
      },
      error: (err) => {
        console.error('Error actualizando la tarea', err);
      }
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== task.id);
      },
      error: (err) => {
        console.error('Error eliminando la tarea', err);
      }
    });
  }
}
