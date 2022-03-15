import { Todo, TodoStatus } from './Todo';

export const TODOS: Todo[] = [
    {
        id: 1,
        title: 'Learn Angular',
        status: TodoStatus.Todo
    },
    {
        id: 2,
        title: 'Learn React',
        status: TodoStatus.Onprogress
    },
    {
        id: 3,
        title: 'Learn Vue',
        status: TodoStatus.Done
    }
];