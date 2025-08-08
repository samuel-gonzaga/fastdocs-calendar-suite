import { CalendarDay } from '@/types/calendar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CalendarDayCellProps {
  day: CalendarDay;
  onClick: () => void;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'meeting':
      return 'bg-calendar-meeting text-white';
    case 'payment':
      return 'bg-calendar-payment text-white';
    case 'other':
      return 'bg-calendar-other text-white';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export const CalendarDayCell = ({ day, onClick }: CalendarDayCellProps) => {
  const hasEvents = day.events.length > 0;
  
  return (
    <div
      className={cn(
        "min-h-[120px] p-2 border-r border-b border-border cursor-pointer hover:bg-muted/30 transition-colors",
        "flex flex-col gap-1",
        !day.isCurrentMonth && "bg-muted/50 text-muted-foreground",
        day.isToday && "bg-accent",
        "last-in-row:border-r-0"
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "text-sm font-medium",
            day.isToday && "text-primary font-bold",
            !day.isCurrentMonth && "text-muted-foreground"
          )}
        >
          {day.dayNumber}
        </span>
        {day.isToday && (
          <div className="w-2 h-2 bg-primary rounded-full" />
        )}
      </div>
      
      <div className="flex flex-col gap-1 flex-1">
        {day.events.slice(0, 3).map((event, index) => (
          <div
            key={event.id}
            className={cn(
              "text-xs px-2 py-1 rounded text-left truncate",
              getCategoryColor(event.category)
            )}
            title={`${event.time} - ${event.title}`}
          >
            <div className="font-medium">{event.time}</div>
            <div className="truncate">{event.title}</div>
          </div>
        ))}
        
        {day.events.length > 3 && (
          <Badge variant="secondary" className="text-xs">
            +{day.events.length - 3} mais
          </Badge>
        )}
      </div>
    </div>
  );
};