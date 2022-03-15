import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() todoItem: any = [];

  @Output() removeTodoItem: EventEmitter<Todo> = new EventEmitter();

  removeTodo(todo: Todo) {
    this.removeTodoItem.emit(todo);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
