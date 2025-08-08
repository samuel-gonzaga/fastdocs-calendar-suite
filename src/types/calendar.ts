export type EventCategory = 'meeting' | 'payment' | 'other';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  category: EventCategory;
  createdAt: string;
  updatedAt: string;
}

export interface CalendarDay {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

export interface CalendarFilters {
  meeting: boolean;
  payment: boolean;
  other: boolean;
}