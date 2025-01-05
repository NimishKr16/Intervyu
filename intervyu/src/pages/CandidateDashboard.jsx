import React, { useState } from "react";
import { useCandidates } from "../context/CandidateContext";
import { Modal, Button } from "flowbite-react";
import { FaTrash, FaEdit } from "react-icons/fa"; // Import delete and edit icons

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
    deleteCandidate(candidateToDelete.id); // Assuming the candidate has an 'id'
    closeDeleteModal();
  };

  return (
    <div className="flex justify-center items-center -mt-56 ml-20">
      <div className="w-full max-w-4xl">
        <h2 class="flex flex-row flex-nowrap items-center">
          <span class="flex-grow block border-t border-black"></span>
          <span class="flex-none block mx-4 px-4 mb-4 py-2.5 text-xl rounded leading-none font-medium bg-black text-white">
            List of Candidates
          </span>
          <span class="flex-grow block border-t border-black"></span>
        </h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Type of Interview</th>
              <th className="border p-2">Date/Time</th>
              <th className="border p-2">Interviewer</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td className="border p-2">{candidate.name}</td>
                <td className="border p-2">{candidate.interviewType}</td>
                <td
                  className={`border p-2 ${
                    candidate.dateTime ? "" : "text-red-500 font-semibold"
                  }`}
                >
                  {candidate.dateTime || "Not Assigned"}
                </td>
                <td
                  className={`border p-2 ${
                    candidate.interviewer ? "" : "text-red-500 font-semibold"
                  }`}
                >
                  {candidate.interviewer || "Not Assigned"}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => openDeleteModal(candidate)}
                    className="text-red-500 mr-2"
                  >
                    <FaTrash />
                  </button>
                  <button className="text-blue-500">
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
