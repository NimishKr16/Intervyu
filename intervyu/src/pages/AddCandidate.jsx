"use client";
import React, { useState } from "react";
import { useCandidates } from "../context/CandidateContext";
import { Dropdown, TextInput, Button } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddCandidate() {
  const { addCandidate } = useCandidates();
  const [name, setName] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const [interviewer, setInterviewer] = useState("");
  const [email, setEmail] = useState("");
  const [round, setRound] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return alert("Please enter a candidate name");
    // console.log(name, interviewType); // for debugging
    addCandidate({ name, interviewType, interviewer, email, round });
    setName("");
    setEmail("");
    setRound("");
    setInterviewType("");
    // Notification
    toast.success("Candidate Added Successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="flex items-center justify-center mt-48 px-4">
      <div>
        <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Add Candidate
          </span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="pb-2">
            <TextInput
              className="w-full"
              id="candidateName"
              type="text"
              placeholder="Enter Candidate Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sizing="md"
            />
          </div>
          <div className="max-w-md">
            <div className="mb-2 block"></div>
            <TextInput
              id="email4"
              type="email"
              icon={HiMail}
              placeholder="Enter Candidate Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-2">
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
          </div>
          <div className="mt-2">
            <Dropdown
              label={ round ||"Select Interview Round"}
              className="mb-2 w-[10%]"
            >
              <Dropdown.Item onClick={() => setRound(1)}>
                1
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setRound(2)}>
                2
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setRound(3)}>
                3
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setRound(4)}>
                4
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setRound(5)}>
                5
              </Dropdown.Item>
            </Dropdown>
          </div>
          <Button
            outline
            gradientDuoTone="greenToBlue"
            type="submit"
            className="mt-4 font-bold"
          >
            Add Candidate
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddCandidate;
