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
      { id: 1, name: 'Alice', type: 'Managerial', position: 'Senior Manager' },
      { id: 2, name: 'Bob', type: 'System Design', position: 'Architect' },
      { id: 3, name: 'Charlie', type: 'Behavioral', position: 'Team Lead' },
      { id: 4, name: 'Diana', type: 'Technical', position: 'Tech Lead' },
      { id: 5, name: 'Eve', type: 'HR', position: 'HR Specialist' },
    ];
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('interviewers', JSON.stringify(interviewers));
  }, [interviewers]);

  const addInterviewer = (interviewer) => {
    setInterviewers((prev) => [...prev, { id: Date.now(), ...interviewer }]);
  };

  const deleteInterviewer = (id) => {
    setInterviewers((prev) => prev.filter((interviewer) => interviewer.id !== id));
  };

  return (
    <InterviewerContext.Provider value={{ interviewers, addInterviewer, deleteInterviewer }}>
      {children}
    </InterviewerContext.Provider>
  );
};