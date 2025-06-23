
export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate?: Date;
  estimatedTime?: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface Habit {
  id: string;
  title: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  streak: number;
  lastCompleted?: Date;
  createdAt: Date;
  userId: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'aegis';
  type: 'text' | 'suggestion' | 'system';
  timestamp: Date;
  userId: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  type: 'event' | 'task' | 'habit';
  relatedId?: string;
  createdAt: Date;
  userId: string;
}

export interface UserPreferences {
  id: string;
  userId: string;
  notifications: boolean;
  autoSchedule: boolean;
  chaosThreshold: number;
  workingHours?: {
    start: string;
    end: string;
  };
  theme: string;
}

export interface AuthPayload {
  userId: string;
  email: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
