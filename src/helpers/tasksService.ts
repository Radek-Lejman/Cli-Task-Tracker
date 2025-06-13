import { Task, Status, Store } from "../types";
import { STORE_FILE_PATH } from "./config";
import { FileStore } from "./fileStore";

export class TaskService {
  private storeFile = new FileStore(STORE_FILE_PATH);

  private async readStore(): Promise<Store> {
    return this.storeFile.read();
  }

  private async writeStore(store: Store): Promise<void> {
    await this.storeFile.write(store);
  }

  private async modifyStore<T>(
    modifier: (store: Store) => { updatedStore: Store; result: T }
  ): Promise<T> {
    const store = await this.readStore();
    const { updatedStore, result } = modifier(store);
    await this.writeStore(updatedStore);
    return result;
  }

  public async getAllTasks(): Promise<Task[]> {
    const { tasks } = await this.readStore();
    return tasks;
  }

  public async getTasksByStatus(status: Status): Promise<Task[]> {
    return (await this.getAllTasks()).filter(task => task.status === status);
  }

  public async addTasks(titles: string[]): Promise<Task[]> {
    return this.modifyStore<Task[]>((store) => {
      const created: Task[] = titles.map(title => ({
        id: ++store.lastId,
        title,
        status: Status.TODO,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      return {
        updatedStore: { lastId: store.lastId, tasks: [...store.tasks, ...created] },
        result: created,
      };
    });
  }

  public async updateTask(
    id: number,
    updates: Partial<Omit<Task, 'id'>>
  ): Promise<Task> {
    return this.modifyStore<Task>((store) => {
      const tasks = [...store.tasks];
      const idx = tasks.findIndex(t => t.id === id);
      if (idx < 0) {
        throw new Error(`Task with id ${id} not found`);
      }
      const updatedTask = { ...tasks[idx], ...updates };
      tasks[idx] = updatedTask;

      return {
        updatedStore: { lastId: store.lastId, tasks },
        result: updatedTask,
      };
    });
  }

  public async deleteTask(id: number): Promise<number> {
    return this.modifyStore<number>((store) => {
      const tasks = store.tasks.filter(t => t.id !== id);
      return {
        updatedStore: { lastId: store.lastId, tasks },
        result: id,
      };
    });
  }

  public async changeTaskStatus(
    id: number,
    status: Status
  ): Promise<Task> {
    return this.updateTask(id, { status, updatedAt: new Date() });
  }

  public async replaceTasks(tasks: Task[]): Promise<void> {
    const store = await this.readStore();
    await this.writeStore({ lastId: store.lastId, tasks });
  }
}

export const taskService = new TaskService();