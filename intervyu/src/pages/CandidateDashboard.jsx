import React from 'react';
import { useCandidates } from '../context/CandidateContext';

const CandidateDashboard = () => {
  const { candidates } = useCandidates();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Candidate List</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Type of Interview</th>
            <th className="border p-2">Date/Time</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id}>
              <td className="border p-2">{candidate.name}</td>
              <td className="border p-2">{candidate.interviewType}</td>
              <td
                className={`border p-2 ${
                    candidate.dateTime ? '' : 'text-red-500 font-semibold'
                }`}
                >
                {candidate.dateTime || 'Pending'}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateDashboard;