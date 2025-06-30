import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Task{
  id: number;
  titulo: string;
  description: string;
  isCompleted: boolean;
  dueDate: string | Date;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})


export class TaskService {

  private apiUrl = 'http://localhost:5201/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(){
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTask(id: number){
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  createTask(task: Task){
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(id: number, task: Task){
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
