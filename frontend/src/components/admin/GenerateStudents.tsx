import React, { useEffect, useState } from "react";
import { Student } from "../../models/Student";
import {DataGrid, GridColDef, GridRowId} from "@mui/x-data-grid";
import {CircularProgress, IconButton, Tooltip, Box, Checkbox, Button, TextField, MenuItem} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {Link, Navigate, useNavigate} from "react-router-dom";
import { Container } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import { BACKEND_API_URL } from "../../../constants";
import { BarChart } from "@mui/icons-material";
import {Paginator} from "../Pagination";
import {getUser, getUsername, isAdmin, isModerator, isUser} from "../utils";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const GenerateStudents = () => {
    const navigate = useNavigate();
    const [no, setNo] = useState(0);

    const generateStudents = async (event: { preventDefault: () => void}) => {
        event.preventDefault();
        try{
            await fetch(`${BACKEND_API_URL}generate/students/?n=${no}`);
            navigate(`/student/`);
        }catch(error){
            console.log(error);
            alert(error);
        }
    };

    return !isAdmin() ? (<Navigate to='/no-permission/' />) : (
        <Container style={{flexDirection: 'column', alignItems: 'center'}}>
            <h1 style={{paddingBottom: "20px", paddingTop: "60px"}}>
                Generate students
            </h1>
            <TextField
                id="no"
                label="No of students"
                variant="outlined"
                type={'number'}
                fullWidth
                sx={{ mb: 2, textAlign: "left" }}
                onChange={(event) => { setNo(parseInt(event.target.value));}}
                value={no.toString()}
            />
            <Button
                variant="contained"
                disabled={!no}
                sx={{
                    width: "100%",
                    backgroundColor: "primary", color: "#fff",
                    "&:hover": {
                        backgroundColor: "black",
                        color: "white",
                        borderColor: "white",
                    },
                }}
                onClick={generateStudents}
            >
                Generate students
            </Button>
        </Container>
    );
};