// src/actions/taskActions.ts
import { Task } from '../types';
import { getAll, updateAll, addNews } from '../helpers/taskStore';

export const addTask = async (titles: string[]) => {
  const newTasks: Task[] = titles.map(title => ({
    id: 0,
    title,
    status: 'todo',
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
  await addNews(newTasks);
};

export const updateTask = async (args: string[]) => {
  const [idStr, ...titleParts] = args;
  const id = parseInt(idStr, 10);
  const newTitle = titleParts.join(' ');
  const tasks = await getAll();
  const idx = tasks.findIndex(t => t.id === id);
  if (idx !== -1) {
    tasks[idx] = { ...tasks[idx], title: newTitle, updatedAt: new Date() };
    await updateAll(tasks);
  }
};

export const deleteTask = async (args: string[]) => {
  const id = parseInt(args[0], 10);
  const tasks = await getAll();
  const filtered = tasks.filter(t => t.id !== id);
  await updateAll(filtered);
};

export const markInProgress = async (args: string[]) => {
  const id = parseInt(args[0], 10);
  const tasks = await getAll();
  const idx = tasks.findIndex(t => t.id === id);
  if (idx !== -1) {
    tasks[idx] = { ...tasks[idx], status: 'in-progress', updatedAt: new Date() };
    await updateAll(tasks);
  }
};

export const markDone = async (args: string[]) => {
  const id = parseInt(args[0], 10);
  const tasks = await getAll();
  const idx = tasks.findIndex(t => t.id === id);
  if (idx !== -1) {
    tasks[idx] = { ...tasks[idx], status: 'done', updatedAt: new Date() };
    await updateAll(tasks);
  }
};

export const listAllTasks = async (): Promise<void> => {
  console.log(await getAll());
};

export const listDoneTasks = async (): Promise<void> => {
  console.log((await getAll()).filter(t => t.status === 'done'));
};

export const listTodoTasks = async (): Promise<void> => {
  console.log((await getAll()).filter(t => t.status === 'todo'));
};

export const listInProgressTasks = async (): Promise<void> => {
  console.log((await getAll()).filter(t => t.status === 'in-progress'));
};