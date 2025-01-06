import React, { useState, useEffect } from "react";
import { useCandidates } from "../context/CandidateContext";
import { useInterviewers } from "../context/InterviewerContext";
import { Modal, Button, Table, Select, TextInput } from "flowbite-react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const CandidateDashboard = () => {
  // Predefined Slots
  const SLOT_TIMINGS = ["10-11am", "12-1pm", "2-3pm", "4-5pm", "5-6pm"];

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

  // Update Available Slots when Interviewer is Selected
  const handleInterviewerSelect = (interviewerName) => {
    setSelectedInterviewer(interviewerName);

    // Find the selected interviewer
    const interviewer = interviewers.find((i) => i.name === interviewerName);

    // If interviewer is found, update available slots
    if (interviewer) {
      const bookedSlots = interviewer.bookedSlots || []; // Ensure bookedSlots is an empty array if not defined
      const available = SLOT_TIMINGS.filter(
        (slot) => !bookedSlots.includes(slot)
      );
      setAvailableSlots(available);
    } else {
      // If interviewer is not found, reset available slots to all slots
      setAvailableSlots(SLOT_TIMINGS);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedSlot(""); // Reset the selected slot when date is changed
  };

  // New function to handle slot availability check for already selected candidates
  const checkSlotAvailability = (selectedDate, selectedSlot) => {
    // Check if the selected date and slot are already booked by any candidate
    const isSlotBooked = candidates.some(
      (candidate) =>
        candidate.dateTime === `${selectedDate} ${selectedSlot}` &&
        candidate.id !== candidateToEdit?.id // Prevent checking the current candidate being edited
    );
    return isSlotBooked;
  };

  const handleEditSave = () => {
    if (
      !editedName ||
      !editedType ||
      !selectedInterviewer ||
      !selectedSlot ||
      !selectedDate
    ) {
      toast.error("All fields must be filled!");
      return;
    }

    // Check if the slot is available for the selected date and time
    if (checkSlotAvailability(selectedDate, selectedSlot)) {
      toast.error("This date and time slot has already been booked!");
      return;
    }

    updateCandidate(candidateToEdit.id, {
      name: editedName,
      interviewType: editedType,
      interviewer: selectedInterviewer,
      dateTime: `${selectedDate} ${selectedSlot}`,
    });

    closeEditModal();
    toast.success(`Candidate "${editedName}" updated successfully.`);
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

            {/* Date Selection */}
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              min={new Date().toISOString().split("T")[0]}
              disabled={!selectedInterviewer} // Disable until interviewer is selected
            />

            {/* Slot Selection */}
            <Select
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
              disabled={!selectedInterviewer || !selectedDate}
            >
              <option value="">Select Time Slot</option>
              {availableSlots.map((slot) => {
                // Find the interviewer object based on selectedInterviewer name
                const selectedInterviewerObj = interviewers.find(
                  (i) => i.name === selectedInterviewer
                );

                // Check if selectedInterviewerObj exists and if bookedSlots is an array
                const isSlotBooked =
                  selectedInterviewerObj &&
                  Array.isArray(selectedInterviewerObj.bookedSlots)
                    ? selectedInterviewerObj.bookedSlots.includes(slot)
                    : false;

                return (
                  <option key={slot} value={slot} disabled={isSlotBooked}>
                    {slot}
                  </option>
                );
              })}
            </Select>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={closeEditModal} color="gray">
              Cancel
            </Button>
            <Button onClick={handleEditSave} color="success">
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default CandidateDashboard;