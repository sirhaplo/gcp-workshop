import { Injectable, signal, computed, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo.model';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = environment.apiUrl + '/todos/';
  
  // Signals for state management
  private todosSignal = signal<Todo[]>([]);
  public todos = computed(() => this.todosSignal());
  
  constructor(private http: HttpClient) {
    this.loadTodos();
  }

  private loadTodos(): void {
    this.http.get<Todo[]>(this.apiUrl).subscribe(
      todos => this.todosSignal.set(todos)
    );
  }

  createTodo(todo: Todo): void {
    this.http.post<Todo>(this.apiUrl, todo).subscribe(() => {
      this.loadTodos();
    });
  }

  updateTodo(id: number, todo: Todo): void {
    this.http.put<Todo>(`${this.apiUrl}/${id}`, todo).subscribe(() => {
      this.loadTodos();
    });
  }

  deleteTodo(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`).subscribe(() => {
      this.loadTodos();
    });
  }

  toggleComplete(todo: Todo): void {
    const updatedTodo = { ...todo, completed: !todo.completed };
    this.updateTodo(todo.id!, updatedTodo);
  }
}