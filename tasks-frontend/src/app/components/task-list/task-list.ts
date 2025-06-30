import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../../shared/services/task';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, RouterModule, FormsModule, MatDialogModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  searchId: number | null = null;

  constructor(private taskService: TaskService, private dialog: MatDialog) { }

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
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Confirmar eliminación',
        message: `¿Estás seguro de que deseas eliminar la tarea "${task.titulo}"?`
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.deleteTask(task.id).subscribe({
          next: () => {
            this.tasks = this.tasks.filter(t => t.id !== task.id);
            this.filteredTasks = this.filteredTasks.filter(t => t.id !== task.id);
          },
          error: (err) => {
            console.error('Error eliminando la tarea', err);
          }
        });
      }
    })

  }
}
