import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html'
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: Todo = {
    title: '',
    description: '',
    completed: false
  };
  editingTodo: Todo | null = null;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe(
      todos => this.todos = todos
    );
  }

  createTodo(): void {
    if (this.newTodo.title.trim()) {
      this.todoService.createTodo(this.newTodo).subscribe(() => {
        this.loadTodos();
        this.newTodo = { title: '', description: '', completed: false };
      });
    }
  }

  startEdit(todo: Todo): void {
    this.editingTodo = { ...todo };
  }

  updateTodo(): void {
    if (this.editingTodo && this.editingTodo.id) {
      this.todoService.updateTodo(this.editingTodo.id, this.editingTodo).subscribe(() => {
        this.loadTodos();
        this.editingTodo = null;
      });
    }
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.loadTodos();
    });
  }

  toggleComplete(todo: Todo): void {
    const updatedTodo = { ...todo, completed: !todo.completed };
    this.todoService.updateTodo(todo.id!, updatedTodo).subscribe(() => {
      this.loadTodos();
    });
  }
}
