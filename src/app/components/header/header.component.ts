import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo, TodoStatus } from 'src/app/Todo';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  todoCount: number = 0;
  todoProgressCount: number = 0;
  todoDoneCount: number = 0;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.subjectMessage.subscribe(
      (todos: Todo[]) => {
        if(todos) {
          this.todoCount = todos.filter(t => t.status === TodoStatus.Todo).length;
          this.todoProgressCount = todos.filter(t => t.status === TodoStatus.Onprogress).length;
          this.todoDoneCount = todos.filter(t => t.status === TodoStatus.Done).length;
        }
      }
    );
  }

}
