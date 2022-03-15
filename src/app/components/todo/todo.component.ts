import { Component, OnInit } from '@angular/core';
import { Todo, TodoStatus } from '../../Todo';
import { TODOS } from '../../TodoData';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  
  todo: string = '';

  TodoStatus = TodoStatus;

  todos: Todo[] = [];
  
  todosOnProgress: Todo[] = [];

  todosDone: Todo[] = [];

  constructor() {}
  
  ngOnInit(): void {
  }


  addTodo() {
    if (this.todo.length > 0) {
      this.todos.push({
        id: Math.random(),
        title: this.todo,
        status: TodoStatus.Todo,
      });
      this.todo = '';
    }
  }

  removeTodo(todo: Todo) {
    console.log(todo)
    if(todo.status === TodoStatus.Todo) {
      this.todos = this.todos.filter(t => t.id !== todo.id);
    } else if(todo.status === TodoStatus.Onprogress) {
      this.todosOnProgress = this.todosOnProgress.filter(t => t.id !== todo.id);
    }
    else if(todo.status === TodoStatus.Done) {
      this.todosDone = this.todosDone.filter(t => t.id !== todo.id);
    }
  }


  drop(event: CdkDragDrop<Todo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {      
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      if(event.container.id === 'cdk-drop-list-0') {
        this.todos[event.currentIndex].status = TodoStatus.Todo;
      } else if(event.container.id === 'cdk-drop-list-1') {
        this.todosOnProgress[event.currentIndex].status = TodoStatus.Onprogress;
      }else if(event.container.id === 'cdk-drop-list-2') {
        this.todosDone[event.currentIndex].status = TodoStatus.Done;
      }
    }
  }

}
