export enum TodoStatus {
    Todo = "Todo",
    Onprogress = "Onprogress",
    Done = "Done"
}

export interface Todo {
    id?: string;
    title: string;
    status: TodoStatus;
    name?: string;
    createdAt?: Date;
}