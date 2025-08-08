import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarEvent, CalendarDay } from '@/types/calendar';
import { EventModal } from './EventModal';
import { Plus, Clock, Edit3, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DayEventsModalProps {
  isOpen: boolean;
  onClose: () => void;
  day: CalendarDay | null;
  onCreateEvent: () => void;
  onEditEvent: (event: CalendarEvent) => void;
}

const getCategoryInfo = (category: string) => {
  switch (category) {
    case 'meeting':
      return { label: 'Reunião', color: 'bg-calendar-meeting', emoji: '👥' };
    case 'payment':
      return { label: 'Pagamento', color: 'bg-calendar-payment', emoji: '💳' };
    case 'other':
      return { label: 'Outro', color: 'bg-calendar-other', emoji: '📌' };
    default:
      return { label: 'Evento', color: 'bg-muted', emoji: '📅' };
  }
};

export const DayEventsModal = ({
  isOpen,
  onClose,
  day,
  onCreateEvent,
  onEditEvent
}: DayEventsModalProps) => {
  if (!day) return null;

  const formattedDate = format(day.date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR });
  const hasEvents = day.events.length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <div className="flex flex-col">
              <span className="capitalize">{formattedDate}</span>
              {day.isToday && (
                <Badge variant="secondary" className="w-fit mt-1">
                  Hoje
                </Badge>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Button
            onClick={onCreateEvent}
            className="w-full gap-2 bg-gradient-primary hover:bg-primary-hover"
          >
            <Plus className="h-4 w-4" />
            Novo Evento
          </Button>

          {hasEvents ? (
            <div className="space-y-3">
              <h3 className="font-medium text-sm text-muted-foreground">
                Eventos do dia ({day.events.length})
              </h3>
              
              <div className="space-y-2">
                {day.events
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((event) => {
                    const categoryInfo = getCategoryInfo(event.category);
                    
                    return (
                      <div
                        key={event.id}
                        className="flex items-start gap-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer group"
                        onClick={() => onEditEvent(event)}
                      >
                        <div className="flex flex-col items-center gap-1 min-w-0">
                          <div className="text-2xl">{categoryInfo.emoji}</div>
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${categoryInfo.color} text-white`}
                          >
                            {categoryInfo.label}
                          </Badge>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="font-mono text-sm font-medium">
                              {event.time}
                            </span>
                          </div>
                          
                          <h4 className="font-medium text-base mb-1 line-clamp-1">
                            {event.title}
                          </h4>
                          
                          {event.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {event.description}
                            </p>
                          )}
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditEvent(event);
                          }}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-lg mb-1">Nenhum evento</p>
              <p className="text-sm">Clique no botão acima para criar um novo evento</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};