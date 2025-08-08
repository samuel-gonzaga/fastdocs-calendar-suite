import { CalendarDay } from '@/types/calendar';
import { CalendarDayCell } from './CalendarDayCell';

interface CalendarGridProps {
  days: CalendarDay[];
  onDayClick: (day: CalendarDay) => void;
}

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export const CalendarGrid = ({ days, onDayClick }: CalendarGridProps) => {
  return (
    <div className="bg-card rounded-lg shadow-medium overflow-hidden">
      {/* Header with week days */}
      <div className="grid grid-cols-7 bg-muted">
        {weekDays.map((day) => (
          <div
            key={day}
            className="p-3 text-center text-sm font-medium text-muted-foreground border-r border-border last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {days.map((day, index) => (
          <CalendarDayCell
            key={`${day.date.toISOString()}-${index}`}
            day={day}
            onClick={() => onDayClick(day)}
          />
        ))}
      </div>
    </div>
  );
};