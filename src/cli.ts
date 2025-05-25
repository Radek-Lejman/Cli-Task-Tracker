// src/cli.ts
import fs from 'fs/promises';
import path from 'path';

const [, , command, ...args] = process.argv;

async function main() {
  switch (command) {
    case 'hello':
      console.log('Hello from Task-Tracker CLI!');
      break;

    case 'echo':
      console.log('Echo:', args.join(' '));
      break;

    default:
      console.error(`Unknown command: ${command}`);
      console.log('Available commands: hello, echo');
      process.exit(1);
  }
}

main().catch(err => {
  console.error('Error executing command:', err);
  process.exit(1);
});