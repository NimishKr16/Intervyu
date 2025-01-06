"use client";
import React, { useState } from 'react';
import InterviewerList from '../components/InterviewerList';
import AddInterviewerModal from '../components/AddInterviewerModal';
import { Button } from 'flowbite-react';

function Interviewers() {
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  return (
    <div >
      
      <InterviewerList />
      <AddInterviewerModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} />
      <Button onClick={() => setAddModalOpen(true)} className="mb-4 ml-6">
        + Add Interviewer
      </Button>
    </div>
  );
}

export default Interviewers;