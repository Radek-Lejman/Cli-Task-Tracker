import { CliAction } from "../types";

export const printHelp = (): void => {
  console.log(`
Usage: <command> [args...]

Commands:
  ${CliAction.ADD} <titles...>           Add one or more tasks
  ${CliAction.UPDATE} <id> <new title>   Update the title of a task
  ${CliAction.DELETE} <id>               Delete a task by id
  ${CliAction.MARK_IN_PROGRESS} <id>     Mark a task as in-progress
  ${CliAction.MARK_DONE} <id>            Mark a task as done
  ${CliAction.LIST_ALL}                  List all tasks
  ${CliAction.LIST_TODO}                 List tasks with status TODO
  ${CliAction.LIST_IN_PROGRESS}          List tasks in progress
  ${CliAction.LIST_DONE}                 List completed tasks
`);
}