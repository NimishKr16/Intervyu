"use client";
import React, { useState } from 'react';
import { Modal, Button, TextInput, Select } from 'flowbite-react';
import { useInterviewers } from '../context/InterviewerContext';

function AddInterviewerModal({ isOpen, onClose }) {
  const { addInterviewer } = useInterviewers();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [position, setPosition] = useState('');

  const handleAdd = () => {
    if (!name || !type || !position) return alert('All fields are required!');
    addInterviewer({ name, type, position });
    setName('');
    setType('');
    setPosition('');
    onClose();
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Add Interviewer</Modal.Header>
      <Modal.Body>
        <TextInput
          placeholder="Interviewer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-2"
        />
        <Select value={type} onChange={(e) => setType(e.target.value)} className="mb-2">
          <option value="">Select Type</option>
          <option value="Managerial">Managerial</option>
          <option value="System Design">System Design</option>
          <option value="Behavioral">Behavioral</option>
          <option value="Technical">Technical</option>
          <option value="HR">HR</option>
        </Select>
        <TextInput
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleAdd}>Add</Button>
        <Button color="gray" onClick={onClose}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddInterviewerModal;