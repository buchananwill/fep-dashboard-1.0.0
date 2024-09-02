'use client';
import FullCalendar from '@fullcalendar/react';
import timegrid from '@fullcalendar/timegrid';

export default function CalendarViewer({
  events
}: {
  events: { start: Date; end: Date }[];
}) {
  return (
    <FullCalendar
      events={events}
      dayHeaderContent={(props) =>
        new Intl.DateTimeFormat('en-GB', {
          day: '2-digit',
          month: '2-digit'
        }).format(props.date)
      }
      titleFormat={{ day: '2-digit', month: '2-digit' }}
      plugins={plugins}
      locale={'en-GB'}
      initialView="timeGridWeek"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridWeek,timeGridDay'
      }}
    />
  );
}

const plugins = [timegrid];
