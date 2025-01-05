import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// SideNav
import FinalSideNav from "./components/FinalSideNav.jsx";
// <-- Pages -->
// Add Candidate
import AddCandidate from "./pages/AddCandidate";
// Candidate Dashboard
import CandidateDashboard from "./pages/CandidateDashboard";
// Candidate List
import { CandidateProvider } from "./context/CandidateContext";

function App() {
  return (
    <>
    <BrowserRouter>
      <CandidateProvider>
        <FinalSideNav/>
        <Routes>
          <Route path="/add-candidate" element={<AddCandidate />} />
          <Route path="/candidates" element={<CandidateDashboard />} />
        </Routes>
      </CandidateProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
