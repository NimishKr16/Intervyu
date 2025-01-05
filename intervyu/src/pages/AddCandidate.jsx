"use client";
import React, { useState } from "react";
import { useCandidates } from "../context/CandidateContext";
import { Dropdown, Label, TextInput } from "flowbite-react";

function AddCandidate() {
  const { addCandidate } = useCandidates();
  const [name, setName] = useState("");
  const [interviewType, setInterviewType] = useState("Technical");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return alert("Please enter a candidate name");
    // console.log(name, interviewType); // for debugging
    addCandidate({ name, interviewType });
    setName("");
    setInterviewType("Technical");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Add Candidate</h2>
      <form onSubmit={handleSubmit}>
        <div className="pb-2">
          <div className="mb-2 block">
            {/* <Label htmlFor="candidateName" value="Candidate Name" /> */}
          </div>
          <TextInput
            className="w-[15%]"
            id="candidateName"
            type="text"
            placeholder="Enter Candidate Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sizing="md"
          />
        </div>
        <Dropdown
          label={interviewType || "Select Interview Type"}
          className="mb-2 w-[10%]"
        >
          <Dropdown.Item onClick={() => setInterviewType("Technical")}>
            Technical
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setInterviewType("System Design")}>
            System Design
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setInterviewType("Managerial")}>
            Managerial
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setInterviewType("Behavioral")}>
            Behavioral
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setInterviewType("HR")}>
            HR
          </Dropdown.Item>
        </Dropdown>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 mt-2 rounded"
        >
          Add Candidate
        </button>
      </form>
    </div>
  );
}

export default AddCandidate;
