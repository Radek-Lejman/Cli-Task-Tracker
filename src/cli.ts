import { CliAction } from './types';
import {
  addTask,
  updateTask,
  deleteTask,
  markInProgress,
  markDone,
  listAllTasks,
  listDoneTasks,
  listTodoTasks,
  listInProgressTasks
} from './actions/taskActions';

const [, , command, ...args] = process.argv;

async function main() {
  try {
    switch (command) {
      case CliAction.ADD:
        await addTask(args);
        break;

      case CliAction.UPDATE:
        await updateTask(args);
        break;

      case CliAction.DELETE:
        await deleteTask(args);
        break;

      case CliAction.MARK_IN_PROGRESS:
        await markInProgress(args);
        break;

      case CliAction.MARK_DONE:
        await markDone(args);
        break;

      case CliAction.LIST_ALL:
        await listAllTasks();
        break;

      case CliAction.LIST_DONE:
        await listDoneTasks();
        break;

      case CliAction.LIST_TODO:
        await listTodoTasks();
        break;

      case CliAction.LIST_IN_PROGRESS:
        await listInProgressTasks();
        break;

      default:
        console.log('Unknown command');
    }
  } catch (e: unknown) {
    console.error(`Error app`, e);
  }
}

main().catch(err => {
  console.error('Error executing command:', err);
  process.exit(1);
});