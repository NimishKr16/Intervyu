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
// Calendar
import Calendar from "./components/Calendar.jsx";


function App() {

  return (
    <>
    <BrowserRouter>
      <CandidateProvider>
      <ToastContainer />
        <TopNav/>
        <Routes>
          <Route path="/add-candidate" element={<AddCandidate />} />
          <Route path="/candidates" element={<CandidateDashboard />} />
          <Route path="/" element={<Calendar />} />
        </Routes>
      </CandidateProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
