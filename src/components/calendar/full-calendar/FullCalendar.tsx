'use client';
import FullCalendar from '@fullcalendar/react';
import timegrid from '@fullcalendar/timegrid';
import { CalendarOptions } from '@fullcalendar/core';
import interaction from '@fullcalendar/interaction';

export default function CalendarViewer({
  headerToolbar,
  ...props
}: CalendarOptions) {
  return (
    <FullCalendar
      {...props}
      dayHeaderContent={(props) =>
        new Intl.DateTimeFormat('en-GB', {
          day: '2-digit',
          month: '2-digit'
        }).format(props.date)
      }
      titleFormat={{ day: '2-digit', month: '2-digit' }}
      plugins={plugins}
      locale={'en-GB'}
      firstDay={1}
      height={'100%'}
      initialView="timeGridWeek"
      headerToolbar={
        headerToolbar ?? {
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek,timeGridDay'
        }
      }
    />
  );
}

const plugins = [timegrid, interaction];
