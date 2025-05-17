export type Priority = 'easy' | 'medium' | 'hard';
export type Category = 'personal' | 'work' | 'health' | 'education' | 'birthday' | 'event';
export type Status = 'active' | 'completed';
export type Filter = 'all' | Status;

export interface Todo {
  id: string;
  title: string;
  description: string;
  category: Category;
  priority: Priority;
  status: Status;
  dueDate: string;
  scheduledTime?: string;
  createdAt: string;
}