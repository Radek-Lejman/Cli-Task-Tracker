// src/helpers/cliActionsMap.ts
import { taskService } from "./tasksService";
import { CliAction, Status } from "../types";

export const cliActions: Record<CliAction, (args: string[]) => Promise<void>> = {
  [CliAction.ADD]: async (args) => {
    const created = await taskService.addTasks(args);
    console.table(created);
  },

  [CliAction.UPDATE]: async (args) => {
    const id = Number(args[0]);
    const title = args.slice(1).join(' ');
    const updated = await taskService.updateTask(id, { title, updatedAt: new Date() });
    console.log(`Task ${id} updated:`, updated);
  },

  [CliAction.DELETE]: async (args) => {
    const id = Number(args[0]);
    await taskService.deleteTask(id);
    console.log(`Task ${id} deleted`);
  },

  [CliAction.MARK_IN_PROGRESS]: async (args) => {
    const id = Number(args[0]);
    const updated = await taskService.changeTaskStatus(id, Status.IN_PROGRESS);
    console.log(`Task ${id} marked in progress:`, updated);
  },

  [CliAction.MARK_DONE]: async (args) => {
    const id = Number(args[0]);
    const updated = await taskService.changeTaskStatus(id, Status.DONE);
    console.log(`Task ${id} marked done:`, updated);
  },

  [CliAction.LIST_ALL]: async () => {
    const tasks = await taskService.getAllTasks();
    console.table(tasks);
  },

  [CliAction.LIST_TODO]: async () => {
    const tasks = await taskService.getTasksByStatus(Status.TODO);
    console.table(tasks);
  },

  [CliAction.LIST_IN_PROGRESS]: async () => {
    const tasks = await taskService.getTasksByStatus(Status.IN_PROGRESS);
    console.table(tasks);
  },

  [CliAction.LIST_DONE]: async () => {
    const tasks = await taskService.getTasksByStatus(Status.DONE);
    console.table(tasks);
  },
};
