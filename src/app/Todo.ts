export enum TodoStatus {
    Todo,
    Onprogress,
    Done
}

export interface Todo {
    id?: number;
    title: string;
    status: TodoStatus;
}