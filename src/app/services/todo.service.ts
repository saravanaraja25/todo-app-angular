import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Todo } from '../Todo';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = environment.apiUrl;

  todos: Todo[] = [];

  private subjectSource = new Subject<Todo[]>();

  subjectMessage = this.subjectSource.asObservable();


  constructor(private http: HttpClient) { }
  
  getTodos() {
    this.http.get<Todo[]>(this.apiUrl + '/todos.json').subscribe(
      (response) => {
        Object.entries(response).forEach(([key, todo]) => {
          todo.id = key;
          this.todos.push(todo);
        });
        this.subjectSource.next(this.todos);
      }
    );
  }

  addTodo(todo: Todo) {
    this.http.post<Todo>(this.apiUrl + '/todos.json', todo).subscribe(
      (response) => {
        todo.id = response.name;
        this.todos.push(todo);
        this.subjectSource.next(this.todos);
      }
    );
  }
  
  removeTodo(todo: Todo) {
    this.http.delete(this.apiUrl + '/todos/' + todo.id + '.json').subscribe(
      (response) => {
        this.todos = this.todos.filter(t => t.id !== todo.id);
        this.subjectSource.next(this.todos);
      }
    );
  }

  updateTodo(todo: Todo) {
    this.http.put(this.apiUrl + '/todos/' + todo.id + '.json', todo).subscribe(
      (response) => {
        this.todos = this.todos.map(t => {
          if (t.id === todo.id) {
            return todo;
          }
          return t;
        });
        this.subjectSource.next(this.todos);
      }
    );
  }
}
