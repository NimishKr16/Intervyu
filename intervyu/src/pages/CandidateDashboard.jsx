import React, { useState } from "react";
import { useCandidates } from "../context/CandidateContext";
import { Modal, Button, Table } from "flowbite-react";
import { FaTrash, FaEdit } from "react-icons/fa";

const CandidateDashboard = () => {
  const { candidates, deleteCandidate } = useCandidates();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [candidateToDelete, setCandidateToDelete] = useState(null); // Store the candidate to delete

  const openDeleteModal = (candidate) => {
    setCandidateToDelete(candidate);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setCandidateToDelete(null);
  };

  const handleDelete = () => {
    deleteCandidate(candidateToDelete.id);
    closeDeleteModal();
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

        {/* Flowbite Table */}
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
              <Table.Row key={candidate.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{candidate.name}</Table.Cell>
                <Table.Cell>{candidate.interviewType}</Table.Cell>
                <Table.Cell
                  className={candidate.dateTime ? "" : "text-red-500 font-semibold"}
                >
                  {candidate.dateTime || "Not Assigned"}
                </Table.Cell>
                <Table.Cell
                  className={candidate.interviewer ? "" : "text-red-500 font-semibold"}
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
                  <button className="text-blue-500">
                    <FaEdit />
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        {/* Delete Confirmation Modal */}
        <Modal show={isModalOpen} onClose={closeDeleteModal} size="md">
          <Modal.Header>Confirm Deletion</Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this candidate?</p>
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
      </div>
    </div>
  );
};

export default CandidateDashboard;