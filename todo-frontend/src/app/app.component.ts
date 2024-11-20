import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TodoService } from './services/todo.service';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    TodoFormComponent,
    TodoItemComponent
  ],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Todo List</h1>
      
      <app-todo-form />
      
      <div class="space-y-4">
        @for (todo of todoService.todos(); track todo.id) {
          <app-todo-item [todo]="todo" />
        }
      </div>
    </div>
  `
})
export class AppComponent {
  todoService = inject(TodoService);
}