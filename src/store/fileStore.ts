import fs from 'fs/promises';
import { Store } from '../types/types';
const DEFAULT_STORE: Store = { lastId: 0, tasks: [] };


export class FileStore {
  constructor(private path: string) {}


  public async read(): Promise<Store> {
    let raw = '';

    try {
      raw = await fs.readFile(this.path, 'utf8');
    } catch (error: unknown) {
      if (this.isFileNotFound(error)) {
        return { ...DEFAULT_STORE };
      }
      throw error;
    }

    if (!raw) {
      return { ...DEFAULT_STORE };
    }

    try {
      const parsed = JSON.parse(raw) as Partial<Store>;
      return {
        lastId: parsed.lastId ?? DEFAULT_STORE.lastId,
        tasks: parsed.tasks ?? DEFAULT_STORE.tasks,
      };
    } catch {
      await this.write(DEFAULT_STORE);
      return { ...DEFAULT_STORE };
    }
  }


  public async write(store: Store): Promise<void> {
    const data = JSON.stringify(store, null, 2);
    await fs.writeFile(this.path, data, 'utf8');
  }

  private isFileNotFound(error: unknown): error is NodeJS.ErrnoException {
    return (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as NodeJS.ErrnoException).code === 'ENOENT'
    );
  }
}

