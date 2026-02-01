export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  remindBeforeMinutes: number; // 0, 5, 15, 60
  priority: Priority;
  isCompleted: boolean;
  isNotified: boolean;
  createdAt: Date;
}
