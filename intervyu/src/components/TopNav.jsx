
"use client";
import React from 'react';
import { Navbar } from "flowbite-react";
import logo from '../images/logo.png';
import { useNavigate } from 'react-router-dom';


export function TopNav() {
    const navigate = useNavigate();
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Intervyu</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link className='cursor-pointer text-lg' onClick={() => navigate('/schedule')} active>
        Schedule
        </Navbar.Link>
        <Navbar.Link className='cursor-pointer text-lg' onClick={() => navigate('/add-candidate')}>
        Add Candidate
        </Navbar.Link>
        <Navbar.Link className='cursor-pointer text-lg' onClick={() => navigate('/candidates')}>All Candidates</Navbar.Link>
        {/* <Navbar.Link href="#">Pricing</Navbar.Link> */}
        {/* <Navbar.Link href="#">Contact</Navbar.Link> */}
      </Navbar.Collapse>
    </Navbar>
  );
}
