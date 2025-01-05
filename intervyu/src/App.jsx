import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// SideNav
import FinalSideNav from "./components/FinalSideNav.jsx";
// <-- Pages -->
// Add Candidate
import AddCandidate from "./pages/AddCandidate";
// Candidate Dashboard
import CandidateDashboard from "./pages/CandidateDashboard";
// Candidate List
import { CandidateProvider } from "./context/CandidateContext";
import Calendar from "./components/Calendar.jsx";


function App() {
  return (
    <>
    <BrowserRouter>
      <CandidateProvider>
      <ToastContainer />
        <FinalSideNav/>
        <Routes>
          <Route path="/add-candidate" element={<AddCandidate />} />
          <Route path="/candidates" element={<CandidateDashboard />} />
          <Route path="/schedule" element={<Calendar />} />
        </Routes>
      </CandidateProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
