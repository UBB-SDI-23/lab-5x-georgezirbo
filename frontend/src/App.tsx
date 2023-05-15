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
import { Login } from './components/auth/Login'
import { NavMenu } from './components/NavMenu'
import {ProfileDetails} from "./components/admin/ProfileDetails";
import {Register} from "./components/auth/Register";
import {UsersAll} from "./components/admin/UserAll";
import {UserRemove} from "./components/admin/UserRemove";
import {UserEdit} from "./components/admin/UserEdit";
import {ManageData} from "./components/admin/ManageData";
import {DeleteStudents} from "./components/admin/DeleteStudents";
import {DeleteCourses} from "./components/admin/DeleteCourses";
import {DeleteGrades} from "./components/admin/DeleteGrades";
import {DeleteTeachers} from "./components/admin/DeleteTeacher";
import {NoPermission} from "./components/NoPermission";
import {GenerateStudents} from "./components/admin/GenerateStudents";
import {GenerateCourses} from "./components/admin/GenerateCourses";
import {GenerateGrades} from "./components/admin/GenerateGrades";
import {GenerateTeachers} from "./components/admin/GenerateTeachers";
import {GenerateUsers} from "./components/admin/GenerateUsers";

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
        <Route path="profile/:username/" element={<ProfileDetails />} />
        <Route path="login/" element={<Login />} />
        <Route path="register/" element={<Register />} />
        <Route path="users/" element={<UsersAll />} />
        <Route path="user/:userID/remove/" element={<UserRemove />} />
        <Route path="user/:userID/edit/" element={<UserEdit />} />
        <Route path="data/" element={<ManageData />} />
        <Route path="generate/student/" element={<GenerateStudents />} />
        <Route path="generate/course/" element={<GenerateCourses />} />
        <Route path="generate/grade/" element={<GenerateGrades />} />
        <Route path="generate/teacher/" element={<GenerateTeachers />} />
        <Route path="generate/user/" element={<GenerateUsers />} />
        <Route path="delete/student/" element={<DeleteStudents />} />
        <Route path="delete/course/" element={<DeleteCourses />} />
        <Route path="delete/teacher/" element={<DeleteTeachers />} />
        <Route path="delete/grade/" element={<DeleteGrades />} />
        <Route path="no-permission/" element={<NoPermission />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App
