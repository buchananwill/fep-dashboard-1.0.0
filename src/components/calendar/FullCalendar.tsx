'use client';
import FullCalendar from '@fullcalendar/react';
import timegrid from '@fullcalendar/timegrid';
import { CalendarOptions } from '@fullcalendar/core';

export default function CalendarViewer(props: CalendarOptions) {
  return (
    <FullCalendar
      {...props}
      dayHeaderContent={(props) =>
        new Intl.DateTimeFormat('en-GB', {
          day: '2-digit',
          month: '2-digit'
        }).format(props.date)
      }
      eventClick={(info) => {
        alert(JSON.stringify(info.event));
      }}
      titleFormat={{ day: '2-digit', month: '2-digit' }}
      plugins={plugins}
      locale={'en-GB'}
      firstDay={1}
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
