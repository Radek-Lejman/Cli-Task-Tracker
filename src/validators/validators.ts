import { CliAction } from "../types/types";

export function requireId(action: CliAction, args: string[]): number | null {
  const [raw, ...extras] = args;
  if (!raw) {
    console.error(`Error: '${action}' requires <id>. Usage: ${action} <id>`);
    return null;
  }
  const id = Number(raw);
  if (isNaN(id)) {
    console.error(`Error: '${raw}' is not a valid number for '${action}'. Instead use: ${action} <id>`);
    return null;
  }
  if (extras.length) {
    console.warn(`Warning: extra args ignored for '${action}': ${extras.join(' ')}`);
  }
  return id;
}

export function requireTitles(action: CliAction, args: string[]): string[] | null {
  if (!args.length) {
    console.error(
      `Error: '${action}' requires at least one <title>. Usage: ${action} <title1> [title2] ...`
    );
    return null;
  }
  const invalid = args.filter(t => /^\d+$/.test(t));
  if (invalid.length) {
    console.error(
      `Error: titles must not be purely numeric for '${action}': ${invalid.join(', ')}`
    );
    return null;
  }
  return args;
}

export function ensureNoArgs(action: CliAction, args: string[]): boolean {
  if (args.length) {
    console.error(`Error: '${action}' does not accept arguments. Usage: ${action}`);
    return false;
  }
  return true;
}