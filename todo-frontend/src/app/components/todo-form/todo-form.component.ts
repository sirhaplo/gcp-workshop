import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mb-6">
      <h2 class="text-xl mb-2">Add New Todo</h2>
      <input 
        [(ngModel)]="newTodo.title"
        placeholder="Title"
        class="border p-2 mr-2 rounded"
      >
      <input 
        [(ngModel)]="newTodo.description"
        placeholder="Description"
        class="border p-2 mr-2 rounded"
      >
      <button 
        (click)="createTodo()"
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Todo
      </button>
    </div>
  `
})
export class TodoFormComponent {
  private todoService = inject(TodoService);

  newTodo: Todo = {
    title: '',
    description: '',
    completed: false
  };

  createTodo(): void {
    if (this.newTodo.title.trim()) {
      this.todoService.createTodo(this.newTodo);
      this.newTodo = { title: '', description: '', completed: false };
    }
  }
}