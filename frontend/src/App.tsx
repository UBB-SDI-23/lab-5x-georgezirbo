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
import { CourseAll } from './components/course/CourseAll' 
import { CourseAdd } from './components/course/CourseAdd' 
import { CourseEdit } from './components/course/CourseEdit' 
import { CourseDetails } from './components/course/CourseDetails' 
import { CourseRemove } from './components/course/CourseRemove'
import { CourseByNoStudents } from './components/course/CourseByNoStudents' 
import { GradeAll } from './components/grade/GradeAll' 
import { GradeAdd } from './components/grade/GradeAdd' 
import { GradeEdit } from './components/grade/GradeEdit' 
import { GradeDetails } from './components/grade/GradeDetails' 
import { GradeRemove } from './components/grade/GradeRemove' 
import { GradeFilter } from './components/grade/GradeFilter'
import { TeacherAll } from './components/teacher/TeacherAll' 
import { TeacherAdd } from './components/teacher/TeacherAdd' 
import { TeacherEdit } from './components/teacher/TeacherEdit' 
import { TeacherDetails } from './components/teacher/TeacherDetails' 
import { TeacherRemove } from './components/teacher/TeacherRemove' 
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
        <Route path="teacher/" element={<TeacherAll />} />
        <Route path="teacher/add/" element={<TeacherAdd />} />
        <Route path="teacher/:teacherID/edit/" element={<TeacherEdit />} />
        <Route path="teacher/:teacherID/details/" element={<TeacherDetails />} />
        <Route path="teacher/:teacherID/remove/" element={<TeacherRemove />} />
        <Route path="course/" element={<CourseAll />} />
        <Route path="course/add/" element={<CourseAdd />} />
        <Route path="course/by-no-students/" element={<CourseByNoStudents />} />
        <Route path="course/:courseID/edit/" element={<CourseEdit />} />
        <Route path="course/:courseID/details/" element={<CourseDetails />} />
        <Route path="course/:courseID/remove/" element={<CourseRemove />} />
        <Route path="grade/" element={<GradeAll />} />
        <Route path="grade/add/" element={<GradeAdd />} />
        <Route path="grade/:gradeID/edit/" element={<GradeEdit />} />
        <Route path="grade/:gradeID/details/" element={<GradeDetails />} />
        <Route path="grade/:gradeID/remove/" element={<GradeRemove />} />
        <Route path="grade/filter/" element={<GradeFilter />} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App
