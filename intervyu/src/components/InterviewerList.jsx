"use client";
import React, { useState } from 'react';
import { useInterviewers } from '../context/InterviewerContext';
import { Modal, Button, Table } from 'flowbite-react';
import { FaTrash, FaPlus } from 'react-icons/fa';

function InterviewerList() {
  const { interviewers, deleteInterviewer } = useInterviewers();
  const [selectedInterviewer, setSelectedInterviewer] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const openDeleteModal = (interviewer) => {
    setSelectedInterviewer(interviewer);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedInterviewer(null);
    setDeleteModalOpen(false);
  };

  const handleDelete = () => {
    if (selectedInterviewer) {
      deleteInterviewer(selectedInterviewer.id);
      closeDeleteModal();
    }
  };

  return (
    <div className="p-6 text-center overflow-x-auto">
        <h1
        class="text-4xl py-4 pb-8 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-sky-400 to-cyan-500">
        All Interviewers
    </h1>
      <Table>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Type</Table.HeadCell>
          <Table.HeadCell>Position</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {interviewers.map((interviewer) => (
            <Table.Row key={interviewer.id}>
              <Table.Cell>{interviewer.name}</Table.Cell>
              <Table.Cell>{interviewer.type}</Table.Cell>
              <Table.Cell>{interviewer.position}</Table.Cell>
              <Table.Cell>
                <button
                  onClick={() => openDeleteModal(interviewer)}
                  className="text-red-500 mr-2"
                >
                  <FaTrash />
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
          Are you sure you want to delete interviewer "{selectedInterviewer?.name}"?
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={closeDeleteModal}>Cancel</Button>
          <Button color="red" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default InterviewerList;