import { cliActions } from "../commands/cliActionsMap";
import { CliAction } from "../types/types";
import { printHelp } from "../utils/printHelp";



const [,, rawCommand, ...args] = process.argv;

async function main(): Promise<void> {
  if (!rawCommand || !(rawCommand in cliActions)) {
    console.error(`Unknown command: ${rawCommand}`);
    printHelp();
    process.exit(1);
  }

  const action = cliActions[rawCommand as CliAction];
  try {
    await action(args);
    process.exit(0);
  } catch (error) {
    console.error(`Error executing "${rawCommand}":`, error);
    process.exit(1);
  }
}

main();
