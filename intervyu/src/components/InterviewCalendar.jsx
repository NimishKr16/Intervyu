import React, { useState } from "react";
import { useCandidates } from "../context/CandidateContext"; // Fetching candidates from context
import { useInterviewers } from "../context/InterviewerContext";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal } from "flowbite-react";


const InterviewCalendar = () => {
  const { candidates } = useCandidates(); // Retrieving the list of candidates
  const { interviewers } = useInterviewers(); // Retrieving interviewers (if needed)
  const [selectedEvent, setSelectedEvent] = useState(null); // Managing state for selected event

  // Creating events based on candidates data
  const events = candidates.map((candidate) => {
    if (!candidate.dateTime) {
      console.error(`No dateTime for candidate: ${candidate.name}`);
      return null; // Skip this candidate if dateTime is missing
    }
  
    try {
      // Extract date and time from candidate.dateTime
      const [date, time] = candidate.dateTime.split(" ");
      if (!date || !time) {
        console.error(`Invalid dateTime format for candidate: ${candidate.name}`);
        return null; // Skip if date or time is missing
      }
  
      const startTime = new Date(`${date}T${time}`);
      const endTime = new Date(startTime);
      endTime.setHours(endTime.getHours() + 1); // Assuming a 1-hour duration
  
      return {
        title: candidate.name, // Candidate's name as event title
        start: startTime, // Event start time
        end: endTime, // Event end time (1-hour duration)
        extendedProps: {
          candidateName: candidate.name,
          interviewer: candidate.interviewer,
          interviewType: candidate.interviewType,
          slot: time,
          date: date,
          round: candidate.round || "Not Specified",
        },
      };
    } catch (error) {
      console.error(`Error processing candidate: ${candidate.name}`, error);
      return null;
    }
  }).filter(event => event !== null); // Filter out invalid events 

  return (
    <div className="px-4">
      <h2 className="text-center text-4xl font-bold mb-4 text-cyan-600 py-4">Interview Calendar</h2>
      <FullCalendar
        height={650}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        handleWindowResize={true}
        events={events}  // Pass the events data to FullCalendar
        headerToolbar={{
          left: "prev,next today",  // Navigation buttons (previous, next, today)
          center: "title",  // Display the calendar's title (month, week, or day)
          right: "dayGridMonth,timeGridWeek,timeGridDay",  // View options: month, week, day
        }}
        eventContent={(eventInfo) => {
          // Render time inside the event block on the calendar
          return (
            <div>
              <strong>{eventInfo.event.title}</strong>  {/* Candidate's name */}
              <div>{eventInfo.event.extendedProps.slot}</div>  {/* Display interview time slot */}
            </div>
          );
        }}
        dateClick={(info) => {
          // Handle date click, for example, navigate or show modal if needed
          console.log("Date clicked:", info.dateStr);
        }}
        eventClick={(info) => {
          // When an event (candidate interview) is clicked, show the event details
          const eventDetails = info.event.extendedProps;  // Get extended properties (candidate details)
          setSelectedEvent(eventDetails);  // Set the selected event for modal
        }}
      />

      {/* Modal to display detailed information about the selected interview */}
      {selectedEvent && (
        <Modal show={Boolean(selectedEvent)} onClose={() => setSelectedEvent(null)} size="md">
          <Modal.Header>Interview Details</Modal.Header>
          <Modal.Body>
            <p><strong>Name:</strong> {selectedEvent.candidateName}</p>  {/* Candidate's name */}
            <p><strong>Interviewer:</strong> {selectedEvent.interviewer}</p>  {/* Interviewer's name */}
            <p><strong>Type of Interview:</strong> {selectedEvent.interviewType}</p>  {/* Interview type */}
            <p><strong>Round:</strong> {selectedEvent.round}</p>  {/* Interview round */}
            <p><strong>Date:</strong> {selectedEvent.date}</p>  {/* Interview date */}
            <p><strong>Time:</strong> {selectedEvent.slot}</p>  {/* Interview time slot */}
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-gray" onClick={() => setSelectedEvent(null)}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default InterviewCalendar;