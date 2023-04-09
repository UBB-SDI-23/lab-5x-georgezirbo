import { useEffect, useState } from 'react'
import {CssBaseline} from "@mui/material"
import './App.css'
import React from 'react';
import { StudentAll } from './components/student/StudentsAll';
import { AppHome } from './components/AppHome';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { StudentAdd } from './components/student/StudentAdd';
import { StudentDetails } from './components/student/StudentDetails';
import { StudentRemove } from './components/student/StudentRemove'
import { StudentEdit } from './components/student/StudentEdit'
import { StudentByAverage } from './components/student/StudentByAverage';
import { NavMenu } from './components/NavMenu'

function App() {

  return (
    
    <BrowserRouter>
      <CssBaseline />
      <NavMenu />
      <Routes>
        <Route path="/" element={<AppHome />} />
        <Route path="student/" element={<StudentAll />} />
        <Route path="student/add/" element={<StudentAdd />} />
        <Route path="student/:studentID/edit/" element={<StudentEdit />} />
        <Route path="student/:studentID/details/" element={<StudentDetails />} />
        <Route path="student/:studentID/remove/" element={<StudentRemove />} />
        <Route path="student/by-average/" element={<StudentByAverage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
