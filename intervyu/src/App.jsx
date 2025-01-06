import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// Top Nav
import { TopNav } from "./components/TopNav.jsx";

// <-- Pages -->
// Add Candidate
import AddCandidate from "./pages/AddCandidate";
// Candidate Dashboard
import CandidateDashboard from "./pages/CandidateDashboard";
// Candidate List
import { CandidateProvider } from "./context/CandidateContext";
import { InterviewerProvider } from './context/InterviewerContext';
// Calendar
import Calendar from "./components/Calendar.jsx";
// Interviewers
import Interviewers from "./pages/Interviewers.jsx";

function App() {

  return (
    <>
    <BrowserRouter>
      <InterviewerProvider>

      
      <CandidateProvider>
      <ToastContainer />
        <TopNav/>
        <Routes>
          <Route path="/add-candidate" element={<AddCandidate />} />
          <Route path="/candidates" element={<CandidateDashboard />} />
          <Route path="/" element={<Calendar />} />
          <Route path="/interviewers" element={<Interviewers />} />
        </Routes>
      </CandidateProvider>
      </InterviewerProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
