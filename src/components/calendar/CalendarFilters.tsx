import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarFilters as FilterType, EventCategory } from '@/types/calendar';
import { Users, CreditCard, Bookmark } from 'lucide-react';

interface CalendarFiltersProps {
  filters: FilterType;
  onToggleFilter: (category: EventCategory) => void;
}

const filterConfig = {
  meeting: {
    label: 'Reuniões',
    icon: Users,
    color: 'calendar-meeting'
  },
  payment: {
    label: 'Pagamentos',
    icon: CreditCard,
    color: 'calendar-payment'
  },
  other: {
    label: 'Outros',
    icon: Bookmark,
    color: 'calendar-other'
  }
};

export const CalendarFilters = ({ filters, onToggleFilter }: CalendarFiltersProps) => {
  return (
    <div className="flex gap-3 p-4 bg-card rounded-lg shadow-soft">
      <span className="text-sm font-medium text-muted-foreground">Filtros:</span>
      {(Object.entries(filterConfig) as [EventCategory, typeof filterConfig[EventCategory]][]).map(
        ([category, config]) => {
          const Icon = config.icon;
          const isActive = filters[category];
          
          return (
            <Button
              key={category}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => onToggleFilter(category)}
              className={`gap-2 ${
                isActive 
                  ? 'bg-primary hover:bg-primary-hover' 
                  : 'hover:bg-secondary'
              }`}
            >
              <Icon className="h-4 w-4" />
              {config.label}
              {isActive && (
                <Badge 
                  variant="secondary" 
                  className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  style={{ backgroundColor: `hsl(var(--${config.color}))` }}
                >
                  ✓
                </Badge>
              )}
            </Button>
          );
        }
      )}
    </div>
  );
};