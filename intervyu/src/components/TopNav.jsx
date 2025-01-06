
"use client";
import React from 'react';
import { Navbar } from "flowbite-react";
import logo from '../images/logo.png';
import { useNavigate } from 'react-router-dom';


export function TopNav() {
    const navigate = useNavigate();
  return (
    <Navbar fluid rounded>
      <Navbar.Brand onClick={() => navigate('/')}>
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Intervyu Logo" />
        <span className="self-center font-mono cursor-pointer hover:text-blue-600 whitespace-nowrap text-xl font-semibold dark:text-white">Intervyu</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link className='cursor-pointer text-lg' onClick={() => navigate('/')} active>
        Schedule
        </Navbar.Link>
        <Navbar.Link className='cursor-pointer text-lg' onClick={() => navigate('/add-candidate')}>
        Add Candidate
        </Navbar.Link>
        <Navbar.Link className='cursor-pointer text-lg' onClick={() => navigate('/candidates')}>All Candidates</Navbar.Link>
        <Navbar.Link className='cursor-pointer text-lg' onClick={() => navigate('/interviewers')}>Interviewers</Navbar.Link>
        {/* <Navbar.Link href="#">Contact</Navbar.Link> */}
      </Navbar.Collapse>
    </Navbar>
  );
}
