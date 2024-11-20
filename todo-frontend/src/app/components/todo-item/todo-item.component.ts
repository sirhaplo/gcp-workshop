import { Component, Input, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="border p-4 rounded">
      <!-- View Mode -->
      <div *ngIf="!isEditing()">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold" [class.line-through]="todo.completed">
              {{ todo.title }}
            </h3>
            <p class="text-gray-600">{{ todo.description }}</p>
            <div class="text-sm text-gray-500">
              Created: {{ todo.created_at | date }}
              <br>
              Updated: {{ todo.updated_at | date }}
            </div>
          </div>
          <div class="space-x-2">
            <input 
              type="checkbox"
              [checked]="todo.completed"
              (change)="todoService.toggleComplete(todo)"
            >
            <button 
              (click)="isEditing.set(true)"
              class="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button 
              (click)="todoService.deleteTodo(todo.id!)"
              class="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Edit Mode -->
      <div *ngIf="isEditing()">
        <input 
          [(ngModel)]="editedTodo.title"
          class="border p-2 mr-2 rounded"
        >
        <input 
          [(ngModel)]="editedTodo.description"
          class="border p-2 mr-2 rounded"
        >
        <button 
          (click)="saveTodo()"
          class="bg-green-500 text-white px-3 py-1 rounded mr-2"
        >
          Save
        </button>
        <button 
          (click)="isEditing.set(false)"
          class="bg-gray-500 text-white px-3 py-1 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  `
})
export class TodoItemComponent {
  @Input({ required: true }) todo!: Todo;
  todoService = inject(TodoService);
  
  isEditing = signal(false);
  editedTodo: Todo = { title: '', description: '', completed: false };

  ngOnInit() {
    this.editedTodo = { ...this.todo };
  }

  saveTodo(): void {
    this.todoService.updateTodo(this.todo.id!, this.editedTodo);
    this.isEditing.set(false);
  }
}