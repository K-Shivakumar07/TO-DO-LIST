import { create } from 'zustand';
import { Todo, Filter } from './types';
import { persist } from 'zustand/middleware';

interface TodoStore {
  todos: Todo[];
  filter: Filter;
  addTodo: (todo: Omit<Todo, 'id' | 'status' | 'createdAt'>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  setFilter: (filter: Filter) => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      filter: 'all',
      addTodo: (todo) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              ...todo,
              id: crypto.randomUUID(),
              status: 'active',
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? { ...todo, status: todo.status === 'active' ? 'completed' : 'active' }
              : todo
          ),
        })),
      setFilter: (filter) => set({ filter }),
    }),
    {
      name: 'todo-storage',
    }
  )
);