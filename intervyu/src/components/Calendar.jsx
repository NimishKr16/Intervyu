import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // Import FullCalendar component
import dayGridPlugin from "@fullcalendar/daygrid"; // Import dayGrid plugin for month view
import interactionPlugin from "@fullcalendar/interaction"; // Import interaction plugin for drag and drop

const Calendar = () => {
  const [events, setEvents] = useState([
    {
      title: "Candidate Interview",
      date: "2025-01-10", // Set your event date here
    },
    {
      title: "System Design Interview",
      date: "2025-01-12", // Set your event date here
    },
    {
      title: "HR Interview",
      date: "2025-01-15", // Set your event date here
    },
  ]);

  const handleDateClick = (arg) => {
    alert("Date clicked: " + arg.dateStr);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Interview Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth" // Set the initial view to month view
        events={events} // Pass the events
        dateClick={handleDateClick} // Handle date click
        editable={true} // Allow event dragging and resizing
        droppable={true} // Allow dragging events
        eventClick={(info) => alert(`Event clicked: ${info.event.title}`)} // Handle event click
      />
    </div>
  );
};

export default Calendar;