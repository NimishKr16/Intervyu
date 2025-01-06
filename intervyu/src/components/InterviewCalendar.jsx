import React, { useState } from "react";
import { useCandidates } from "../context/CandidateContext"; // Fetching candidates from context
import { useInterviewers } from "../context/InterviewerContext";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal } from "flowbite-react";
import { useNavigate } from 'react-router-dom';

const InterviewCalendar = () => {
  const { candidates } = useCandidates(); // Retrieving the list of candidates
  const { interviewers } = useInterviewers(); // Retrieving interviewers (if needed)
  const [selectedEvent, setSelectedEvent] = useState(null); // Managing state for selected event
  const navigate = useNavigate(); // To navigate to other pages if needed

  // Creating events based on candidates data
  const events = candidates.map((candidate) => {
    if (!candidate.dateTime) {
      console.error(`No dateTime for candidate: ${candidate.name}`);
      return null; // Skip this candidate if dateTime is missing
    }
  
    const [date, time] = candidate.dateTime.split(" "); // Split date and time from candidate's dateTime
    const eventTime = time || "";  // Assign time if available, otherwise default to empty
  
    const startTime = new Date(`${date}`); // Converting date to Date object
  
    return {
      title: candidate.name,  // Candidate's name as event title
      date: date,  // Using date for the calendar date
      start: new Date(`${date}`),  // Setting the event start time
      extendedProps: {
        candidateName: candidate.name, // Candidate's name
        interviewer: candidate.interviewer, // Interviewer's name
        interviewType: candidate.interviewType, // Type of interview (e.g. Technical, HR)
        slot: eventTime, // Interview time slot
        round: candidate.interviewRound || "Not Specified", // Interview round, with a default value if not present
      },
    };
  }).filter(event => event !== null); // Filter out null events (in case dateTime was missing)

  return (
    <div className="w-[80%] h-[80%] mx-auto">
      <h2 className="text-center text-xl font-bold mb-4">Interview Calendar</h2>
      <FullCalendar
        style={{ height: "80%", width: "80%", maxWidth: "900px", margin: "0 auto" }}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}  // Pass the events data to FullCalendar
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