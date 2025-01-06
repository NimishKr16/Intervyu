import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Context
const InterviewerContext = createContext();

// Custom Hook for easy access
export const useInterviewers = () => useContext(InterviewerContext);

// Provider Component
export const InterviewerProvider = ({ children }) => {
  const [interviewers, setInterviewers] = useState(() => {
    const saved = localStorage.getItem('interviewers');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Alice', type: 'Managerial', position: 'Senior Manager', bookedSlots: [] },
      { id: 2, name: 'Bob', type: 'System Design', position: 'Architect', bookedSlots: [] },
      { id: 3, name: 'Charlie', type: 'Behavioral', position: 'Team Lead', bookedSlots: [] },
      { id: 4, name: 'Diana', type: 'Technical', position: 'Tech Lead', bookedSlots: [] },
      { id: 5, name: 'Eve', type: 'HR', position: 'HR Specialist', bookedSlots: [] },
    ];
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('interviewers', JSON.stringify(interviewers));
  }, [interviewers]);

  const addInterviewer = (interviewer) => {
    setInterviewers((prev) => [...prev, { id: Date.now(), ...interviewer, bookedSlots: [] }]);
  };

  const deleteInterviewer = (id) => {
    setInterviewers((prev) => prev.filter((interviewer) => interviewer.id !== id));
  };

  const updateBookedSlots = (interviewerId, slot) => {
    setInterviewers((prev) =>
      prev.map((interviewer) =>
        interviewer.id === interviewerId
          ? { ...interviewer, bookedSlots: [...interviewer.bookedSlots, slot] }
          : interviewer
      )
    );
  };

  return (
    <InterviewerContext.Provider value={{ interviewers, addInterviewer, deleteInterviewer, updateBookedSlots }}>
      {children}
    </InterviewerContext.Provider>
  );
};