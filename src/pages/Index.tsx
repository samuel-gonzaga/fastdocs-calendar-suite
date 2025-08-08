import { useState } from 'react';
import { CalendarDay, CalendarEvent } from '@/types/calendar';
import { useCalendar } from '@/hooks/useCalendar';
import { CalendarHeader } from '@/components/calendar/CalendarHeader';
import { CalendarFilters } from '@/components/calendar/CalendarFilters';
import { CalendarGrid } from '@/components/calendar/CalendarGrid';
import { DayEventsModal } from '@/components/calendar/DayEventsModal';
import { EventModal } from '@/components/calendar/EventModal';

const Index = () => {
  const {
    currentDate,
    calendarDays,
    filters,
    addEvent,
    updateEvent,
    deleteEvent,
    navigateMonth,
    setMonth,
    toggleFilter
  } = useCalendar();

  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
  const [isDayModalOpen, setIsDayModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | undefined>();

  const handleDayClick = (day: CalendarDay) => {
    setSelectedDay(day);
    setIsDayModalOpen(true);
  };

  const handleCreateEvent = () => {
    setEditingEvent(undefined);
    setIsDayModalOpen(false);
    setIsEventModalOpen(true);
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setEditingEvent(event);
    setIsDayModalOpen(false);
    setIsEventModalOpen(true);
  };

  const handleCloseEventModal = () => {
    setIsEventModalOpen(false);
    setEditingEvent(undefined);
  };

  const handleCloseDayModal = () => {
    setIsDayModalOpen(false);
    setSelectedDay(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 max-w-7xl">
        <div className="space-y-6">
          {/* Calendar Header */}
          <CalendarHeader
            currentDate={currentDate}
            onNavigate={navigateMonth}
            onMonthChange={setMonth}
          />

          {/* Filters */}
          <CalendarFilters
            filters={filters}
            onToggleFilter={toggleFilter}
          />

          {/* Calendar Grid */}
          <CalendarGrid
            days={calendarDays}
            onDayClick={handleDayClick}
          />
        </div>

        {/* Day Events Modal */}
        <DayEventsModal
          isOpen={isDayModalOpen}
          onClose={handleCloseDayModal}
          day={selectedDay}
          onCreateEvent={handleCreateEvent}
          onEditEvent={handleEditEvent}
        />

        {/* Event Creation/Edit Modal */}
        <EventModal
          isOpen={isEventModalOpen}
          onClose={handleCloseEventModal}
          onSave={addEvent}
          onUpdate={updateEvent}
          onDelete={deleteEvent}
          event={editingEvent}
          selectedDate={selectedDay?.date || new Date()}
        />
      </div>
    </div>
  );
};

export default Index;
