import React, { createContext, useContext, useEffect, useState } from 'react';

// Create Context
const CandidateContext = createContext();

// Custom Hook for easy access
export const useCandidates = () => useContext(CandidateContext);

// Provider Component
export const CandidateProvider = ({ children }) => {
  const [candidates, setCandidates] = useState(() => {
    // Get initial data from localStorage
    const savedCandidates = localStorage.getItem('candidates');
    return savedCandidates ? JSON.parse(savedCandidates) : [];
  });

  // Update localStorage whenever candidates change
  useEffect(() => {
    localStorage.setItem('candidates', JSON.stringify(candidates));
  }, [candidates]);

  // Add Candidate Function
  const addCandidate = (candidate) => {
    const newCandidate = {
      ...candidate,
      id: Date.now(), // Unique ID based on current timestamp
      date: 'Pending',
      time: 'Pending',
    };
    setCandidates((prev) => [...prev, newCandidate]);
  };

  // Delete Candidate Function
  const deleteCandidate = (id) => {
    setCandidates((prev) => prev.filter((candidate) => candidate.id !== id));
  };

  // Update Candidate Function
  const updateCandidate = (id, updatedData) => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === id ? { ...candidate, ...updatedData } : candidate
      )
    );
  };

  return (
    <CandidateContext.Provider value={{ candidates, addCandidate, deleteCandidate, updateCandidate }}>
      {children}
    </CandidateContext.Provider>
  );
};