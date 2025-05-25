import fs from 'fs/promises';
import { Task } from '../types';

export const getAll = async (): Promise<Task[]> => JSON.parse(await fs.readFile("src/taskStore.json", "utf8") || `[]`);

export const updateAll = async (tasks: Task[]) => fs.writeFile('src/taskStore.json', JSON.stringify(tasks));

export const addNew = async (newTask: Task): Promise<void> => {
    const allTasks = await getAll();

    allTasks.push(newTask);
    updateAll(allTasks);
}
export const addNews = async (newTasks: Task[]): Promise<void> => {
    const allTasks = await getAll();

    allTasks.push(...newTasks);
    updateAll(allTasks);
}


