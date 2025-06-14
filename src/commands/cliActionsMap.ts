import { taskService } from "../services/tasksService";
import { CliAction, Status } from "../types/types";
import { requireTitles, requireId, ensureNoArgs } from "../validators/validators";


export const cliActions: Record<CliAction, (args: string[]) => Promise<void>> = {
  [CliAction.ADD]: async (args) => {
    const titles = requireTitles(CliAction.ADD, args);
    if (!titles) return;
    console.table(await taskService.addTasks(titles));
  },

  [CliAction.UPDATE]: async (args) => {
    if (args.length < 2) {
      console.error(`Error: '${CliAction.UPDATE}' requires <id> and <new title>. Usage: ${CliAction.UPDATE} <id> <new title>`);
      return;
    }
    const id = requireId(CliAction.UPDATE, args);
    if (id === null) return;
    const title = args.slice(1).join(' ');
    console.log(`Task ${id} updated:`, await taskService.updateTask(id, { title, updatedAt: new Date() }));
  },

  [CliAction.DELETE]: async (args) => {
    const id = requireId(CliAction.DELETE, args);
    if (id === null) return;
    await taskService.deleteTask(id);
    console.log(`Task ${id} deleted`);
  },

  [CliAction.MARK_IN_PROGRESS]: async (args) => {
    const id = requireId(CliAction.MARK_IN_PROGRESS, args);
    if (id === null) return;
    console.log(
      `Task ${id} marked in progress:`,
      await taskService.changeTaskStatus(id, Status.IN_PROGRESS)
    );
  },

  [CliAction.MARK_DONE]: async (args) => {
    const id = requireId(CliAction.MARK_DONE, args);
    if (id === null) return;
    console.log(
      `Task ${id} marked done:`,
      await taskService.changeTaskStatus(id, Status.DONE)
    );
  },

  [CliAction.LIST_ALL]: async (args) => {
    if (!ensureNoArgs(CliAction.LIST_ALL, args)) return;
    console.table(await taskService.getAllTasks());
  },

  [CliAction.LIST_TODO]: async (args) => {
    if (!ensureNoArgs(CliAction.LIST_TODO, args)) return;
    console.table(await taskService.getTasksByStatus(Status.TODO));
  },

  [CliAction.LIST_IN_PROGRESS]: async (args) => {
    if (!ensureNoArgs(CliAction.LIST_IN_PROGRESS, args)) return;
    console.table(await taskService.getTasksByStatus(Status.IN_PROGRESS));
  },

  [CliAction.LIST_DONE]: async (args) => {
    if (!ensureNoArgs(CliAction.LIST_DONE, args)) return;
    console.table(await taskService.getTasksByStatus(Status.DONE));
  },
};