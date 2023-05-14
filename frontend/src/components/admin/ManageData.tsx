import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CircularProgress, IconButton, Tooltip, Box, Checkbox, MenuItem, TextField } from "@mui/material";
import {Link, Navigate, useNavigate} from "react-router-dom";
import { Container } from "react-bootstrap";
import {isAdmin, isUser} from "../utils";
export const ManageData = () => {
    const navigate = useNavigate();
    const [model, setModel] = useState('');

    return !isAdmin() ? (<Navigate to='/no-permission/' />) : (
        <Container style={{flexDirection: 'column', alignItems: 'center'}}>
            <h1 style={{paddingBottom: "20px", paddingTop: "60px"}}>
                Generate
            </h1>
            <TextField
                id="model"
                label="Model"
                variant="outlined"
                fullWidth
                select
                sx={{ mb: 2, textAlign: "left" }}
                onChange={(event) => { setModel(event.target.value); navigate(`/generate/${event.target.value}/`)}}
                value={model}
            >
                <MenuItem value="student" >Student</MenuItem>
                <MenuItem value="course" >Course</MenuItem>
                <MenuItem value="grade">Grade</MenuItem>
                <MenuItem value="teacher">Teacher</MenuItem>
                <MenuItem value="user">User</MenuItem>
            </TextField>
            <h1 style={{paddingBottom: "20px", paddingTop: "60px"}}>
                Delete
            </h1>
            <TextField
                id="model"
                label="Model"
                variant="outlined"
                fullWidth
                select
                sx={{ mb: 2, textAlign: "left" }}
                onChange={(event) => { setModel(event.target.value); navigate(`/delete/${event.target.value}/`)}}
                value={model}
            >
                <MenuItem value="student" >Student</MenuItem>
                <MenuItem value="course" >Course</MenuItem>
                <MenuItem value="grade">Grade</MenuItem>
                <MenuItem value="teacher">Teacher</MenuItem>
            </TextField>
        </Container>
    );
};
