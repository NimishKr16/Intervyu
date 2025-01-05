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
    // console.log(savedCandidates); // for debugging
    return savedCandidates ? JSON.parse(savedCandidates) : [];
  });

  // Update localStorage whenever candidates change
  useEffect(() => {
    localStorage.setItem('candidates', JSON.stringify(candidates));
  }, [candidates]);

  // Add Candidate Function
  const addCandidate = (candidate) => {
    setCandidates((prev) => [...prev, { ...candidate, date: 'Pending', time: 'Pending' }]);
  };

  return (
    <CandidateContext.Provider value={{ candidates, addCandidate }}>
      {children}
    </CandidateContext.Provider>
  );
};