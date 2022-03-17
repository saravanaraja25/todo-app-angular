import { Component, OnInit } from '@angular/core';
import { Todo, TodoStatus } from '../../Todo';
import { TodoService } from 'src/app/services/todo.service';
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

  constructor(private todoService: TodoService) {}
  
  ngOnInit(): void {
    this.todoService.subjectMessage.subscribe(
      (todos: Todo[]) => {
        if(todos) {
          this.todos = todos.filter(t => t.status === TodoStatus.Todo);
          this.todosOnProgress = todos.filter(t => t.status === TodoStatus.Onprogress);
          this.todosDone = todos.filter(t => t.status === TodoStatus.Done);
        }
      }
    );
    this.todoService.getTodos();
  }


  addTodo() {
    if (this.todo.length > 0) {
      this.todoService.addTodo({
        title: this.todo,
        status: TodoStatus.Todo,
      });
      this.todo = '';
    }
  }

  removeTodo(todo: Todo) {
    console.log(todo)
    this.todoService.removeTodo(todo);
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
        this.todoService.updateTodo(this.todos[event.currentIndex]);
      } else if(event.container.id === 'cdk-drop-list-1') {
        this.todosOnProgress[event.currentIndex].status = TodoStatus.Onprogress;
        this.todoService.updateTodo(this.todosOnProgress[event.currentIndex]);
      }else if(event.container.id === 'cdk-drop-list-2') {
        this.todosDone[event.currentIndex].status = TodoStatus.Done;
        this.todoService.updateTodo(this.todosDone[event.currentIndex]);
      }
    }
  }

}
