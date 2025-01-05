
"use client";
import React from 'react';
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import logo from '../images/logo.png';
import { useNavigate } from 'react-router-dom';

export function SideNav() {
  const navigate = useNavigate();
  return (
    <Sidebar>
      <Sidebar.Logo img={logo} imgAlt="Intervyu logo">
        INTERVYU
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiInbox}
          className='cursor-pointer'>
            Schedule
          </Sidebar.Item>
          <Sidebar.Item onClick={() => navigate('/add-candidate')} icon={HiViewBoards}
            className='cursor-pointer'>
            Add Candidate
          </Sidebar.Item>
          <Sidebar.Item onClick={() => navigate('/candidates')} icon={HiUser}
          className='cursor-pointer'>
            All Candidates
          </Sidebar.Item>
          {/* <Sidebar.Item href="#" icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiTable}>
            Sign Up
          </Sidebar.Item> */}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
