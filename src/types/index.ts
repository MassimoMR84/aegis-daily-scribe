
export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate?: Date;
  estimatedTime?: number; // en minutos
  subtasks?: Subtask[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  estimatedTime?: number;
}

export interface Habit {
  id: string;
  title: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  streak: number;
  lastCompleted?: Date;
  targetDays?: number[];
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'aegis';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'system';
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'class' | 'task' | 'habit' | 'event';
  description?: string;
  color?: string;
}

export interface UserMode {
  current: 'assisted' | 'automatic' | 'chaos';
  preferences: {
    notifications: boolean;
    autoSchedule: boolean;
    chaosThreshold: number;
  };
}

export interface DailyStats {
  date: Date;
  tasksCompleted: number;
  tasksTotal: number;
  habitsCompleted: number;
  habitsTotal: number;
  productivityScore: number;
  mood?: 'excellent' | 'good' | 'okay' | 'bad';
}
