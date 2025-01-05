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
      id: Date.now(), // Assign a unique id based on current timestamp
      date: 'Pending',
      time: 'Pending',
    };
    setCandidates((prev) => [...prev, newCandidate]);
  };

  // Delete Candidate Function
  const deleteCandidate = (id) => {
    setCandidates((prev) => prev.filter((candidate) => candidate.id !== id));
  };

  return (
    <CandidateContext.Provider value={{ candidates, addCandidate, deleteCandidate }}>
      {children}
    </CandidateContext.Provider>
  );
};