import React, { useState, useEffect } from "react";
import { useCandidates } from "../context/CandidateContext";
import { useInterviewers } from "../context/InterviewerContext";
import { Modal, Button, Table, Select, TextInput } from "flowbite-react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const CandidateDashboard = () => {
  // Predefined Slots
  const SLOT_TIMINGS = ["10:00", "12:00", "14:00", "16:00", "17:00"];

  const { candidates, deleteCandidate, updateCandidate } = useCandidates();
  const { interviewers } = useInterviewers();

  // State for Modals and Candidate Data
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [candidateToDelete, setCandidateToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [candidateToEdit, setCandidateToEdit] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedType, setEditedType] = useState("");
  const [selectedInterviewer, setSelectedInterviewer] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState(SLOT_TIMINGS);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [isDateTimePickerEnabled, setIsDateTimePickerEnabled] = useState(false); // STATE to toggle DateTimePicker

  // Open and Close Modals
  const openDeleteModal = (candidate) => {
    setCandidateToDelete(candidate);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCandidateToDelete(null);
  };

  const handleDelete = () => {
    deleteCandidate(candidateToDelete.id);
    closeDeleteModal();
    toast.warn(
      `Candidate "${candidateToDelete?.name}" has been deleted successfully.`,
      {
        position: "top-right",
      }
    );
  };

  // Allow only specified time slots
  const isValidTimeSlot = (time) => {
    const selectedHours = time.getHours(); // Extract hours from Date object
    const selectedMinutes = time.getMinutes(); // Extract minutes
    const formattedTime = `${String(selectedHours).padStart(2, "0")}:${String(
      selectedMinutes
    ).padStart(2, "0")}`;
    return SLOT_TIMINGS.includes(formattedTime);
  };

  const openEditModal = (candidate) => {
    setCandidateToEdit(candidate);
    setEditedName(candidate.name);
    setEditedType(candidate.interviewType);
    setSelectedInterviewer(candidate.interviewer || "");
    setSelectedSlot(candidate.dateTime || "");
    setSelectedDate(candidate.dateTime ? candidate.dateTime.split(" ")[0] : ""); // Extract date from dateTime
    setAvailableSlots(SLOT_TIMINGS); // Reset available slots
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCandidateToEdit(null);
    setEditedName("");
    setEditedType("");
    setSelectedInterviewer("");
    setSelectedSlot("");
    setSelectedDate("");
    setAvailableSlots(SLOT_TIMINGS);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedSlot(""); // Reset the selected slot when date is changed
  };

  // ✅ Check if selected date-time is already booked
  const isSlotBooked = (dateTime) => {
    if (!selectedInterviewer) return false;

    const selectedInterviewerObj = interviewers.find(
      (i) => i.name === selectedInterviewer
    );
    if (
      !selectedInterviewerObj ||
      !Array.isArray(selectedInterviewerObj.bookedSlots)
    ) {
      return false;
    }

    const selectedTime = dateTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const selectedDate = dateTime.toLocaleDateString();

    // Check if both date and time match
    return selectedInterviewerObj.bookedSlots.some(
      (slot) => slot.date === selectedDate && slot.time === selectedTime
    );
  };

  const handleEditSave = () => {
    if (
      !editedName ||
      !editedType ||
      !selectedInterviewer ||
      !selectedDateTime
    ) {
      toast.error("All fields must be filled!");
      return;
    }

    // Format selectedDateTime into a readable string
    const formattedDateTime = format(selectedDateTime, "yyyy-MM-dd HH:mm");

    const selectedInterviewerObj = interviewers.find(
      (i) => i.name === selectedInterviewer
    );

    if (selectedInterviewerObj) {
      // Ensure bookedSlots is initialized as an array
      if (!Array.isArray(selectedInterviewerObj.bookedSlots)) {
        selectedInterviewerObj.bookedSlots = [];
      }

      // Extract the old slot if editing
      const oldSlot = candidateToEdit?.dateTime || null;

      // Remove old slot if it exists
      if (oldSlot) {
        selectedInterviewerObj.bookedSlots =
          selectedInterviewerObj.bookedSlots.filter((slot) => slot !== oldSlot);
      }

      // Check if the new slot is already booked by someone else
      const isAlreadyBooked = selectedInterviewerObj.bookedSlots.some(
        (slot) => slot === formattedDateTime
      );

      if (isAlreadyBooked) {
        toast.error("This slot is already booked. Please select another slot.");
        return;
      }

      // Add the new slot
      selectedInterviewerObj.bookedSlots.push(formattedDateTime);
    }

    // Save the updated data
    updateCandidate(candidateToEdit.id, {
      name: editedName,
      interviewType: editedType,
      interviewer: selectedInterviewer,
      dateTime: formattedDateTime,
    });

    closeEditModal();
    toast.success(`Candidate "${editedName}" updated successfully.`);
  };
  // ✅ Enable DateTime Picker only after selecting an interviewer
  const handleInterviewerSelect = (interviewerName) => {
    setSelectedInterviewer(interviewerName);
    setIsDateTimePickerEnabled(!!interviewerName); // Enable DateTimePicker if interviewer is selected

    // Update available slots based on interviewer
    const interviewer = interviewers.find((i) => i.name === interviewerName);
    if (interviewer) {
      const bookedSlots = interviewer.bookedSlots || [];
      const available = SLOT_TIMINGS.filter(
        (slot) => !bookedSlots.includes(slot)
      );
      setAvailableSlots(available);
    } else {
      setAvailableSlots(SLOT_TIMINGS);
    }

    setSelectedDateTime(null); // Reset DateTime when interviewer changes
  };

  const handleDescheduleInterview = () => {
    const isConfirmed = window.confirm("Are you sure you want to deschedule this interview?");

    if (!isConfirmed) {
      return; // If the user cancels, exit the function
    }

    // Logic to set the interview back to pending or remove the date and time
    const updatedCandidate = {
      ...candidateToEdit,
      dateTime: "", // Reset dateTime to null or use 'pending' if you prefer
      interviewer: "", // Assuming you have an 'interviewStatus' field to mark it as pending
    };
  
    // Update the candidate with the descheduled status
    updateCandidate(candidateToEdit.id, updatedCandidate);
  
    // Show a Toast notification
    toast.success("The interview has been descheduled and set to pending.");
  
    // Close the modal after descheduling
    closeEditModal();
  };

  return (
    <div className="flex justify-center items-center mt-24 px-4 overflow-x-auto">
      <div className="w-full max-w-5xl overflow-x-auto">
        <h2 className="flex flex-row flex-nowrap items-center mb-4">
          <span className="flex-grow block border-t border-black"></span>
          <span className="flex-none block mx-4 px-4 py-2.5 text-xl rounded leading-none font-medium bg-black text-white">
            List of Candidates
          </span>
          <span className="flex-grow block border-t border-black"></span>
        </h2>

        {/* Candidate Table */}
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Type of Interview</Table.HeadCell>
            <Table.HeadCell>Date/Time</Table.HeadCell>
            <Table.HeadCell>Interviewer</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {candidates.map((candidate) => (
              <Table.Row key={candidate.id}>
                <Table.Cell>{candidate.name}</Table.Cell>
                <Table.Cell>{candidate.interviewType}</Table.Cell>
                <Table.Cell
                  className={
                    candidate.dateTime ? "" : "text-red-500 font-semibold"
                  }
                >
                  {candidate.dateTime || "Not Assigned"}
                </Table.Cell>
                <Table.Cell
                  className={
                    candidate.interviewer ? "" : "text-red-500 font-semibold"
                  }
                >
                  {candidate.interviewer || "Not Assigned"}
                </Table.Cell>
                <Table.Cell>
                  <button
                    onClick={() => openDeleteModal(candidate)}
                    className="text-red-500 mr-2"
                  >
                    <FaTrash />
                  </button>
                  <button
                    onClick={() => openEditModal(candidate)}
                    className="text-blue-500"
                  >
                    <FaEdit />
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        {/* Delete Confirmation Modal */}
        <Modal show={isDeleteModalOpen} onClose={closeDeleteModal} size="md">
          <Modal.Header>Confirm Deletion</Modal.Header>
          <Modal.Body>
            Are you sure you want to delete "{candidateToDelete?.name}"?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={closeDeleteModal} color="gray">
              No
            </Button>
            <Button onClick={handleDelete} color="failure">
              Yes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Candidate Modal */}
        <Modal show={isEditModalOpen} onClose={closeEditModal} size="md">
          <Modal.Header>Edit Candidate</Modal.Header>
          <Modal.Body>
            <TextInput
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              placeholder="Name"
            />
            <TextInput
              value={editedType}
              className="py-2"
              onChange={(e) => setEditedType(e.target.value)}
              placeholder="Type of Interview"
            />

            {/* Interviewer Selection */}
            <Select
              value={selectedInterviewer}
              onChange={(e) => handleInterviewerSelect(e.target.value)}
            >
              <option value="">Select Interviewer</option>
              {interviewers.map((i) => (
                <option key={i.id} value={i.name}>
                  {i.name}
                </option>
              ))}
            </Select>

            {/* Date and Time Picker */}
            <label className="block mb-2 font-medium pt-2">
              Select Date & Time:
            </label>
            <DatePicker
              selected={selectedDateTime}
              onChange={(date) => setSelectedDateTime(date)}
              showTimeSelect
              dateFormat="Pp"
              minDate={new Date()} // Disable past dates
              timeIntervals={60} // Ensures hour-specific slots only
              placeholderText="Select date and time"
              className="border p-2 rounded w-full mb-4"
              filterTime={(time) =>
                isValidTimeSlot(time) && !isSlotBooked(time)
              } // Allow only specific time slots
              disabled={!isDateTimePickerEnabled}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={closeEditModal} color="gray">
              Cancel
            </Button>
            <Button onClick={handleEditSave} color="success">
              Save
            </Button>

            {/* Deschedule Interview Button */}
            <Button
              onClick={handleDescheduleInterview} // Handle the descheduling logic
              color="failure" // Red button
            >
              Deschedule Interview
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default CandidateDashboard;
