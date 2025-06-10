export interface Store {
  lastId: number;
  tasks: Task[]
}

export enum Status {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  DONE = 'done'
}

export interface Task {
  id: number;
  title: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}

export type NewTask = Omit<Task, 'id'>


export enum CliAction {
  ADD = 'add',
  UPDATE = 'update',
  DELETE = 'delete',
  MARK_IN_PROGRESS = 'mark-in-progress',
  MARK_DONE = 'mark-done',
  LIST_ALL = 'list',
  LIST_DONE = 'list-done',
  LIST_TODO = 'list-todo',
  LIST_IN_PROGRESS = 'list-in-progress',
}