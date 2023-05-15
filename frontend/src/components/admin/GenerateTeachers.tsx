import React, {useState } from "react";
import {Button, TextField} from "@mui/material";
import {Navigate, useNavigate} from "react-router-dom";
import { Container } from "react-bootstrap";
import { BACKEND_API_URL } from "../../../constants";
import {isAdmin} from "../utils";

export const GenerateTeachers = () => {
    const navigate = useNavigate();
    const [no, setNo] = useState(0);

    const generateTeachers = async (event: { preventDefault: () => void}) => {
        event.preventDefault();
        try{
            await fetch(`${BACKEND_API_URL}generate/teachers/?n=${no}`);
            navigate(`/teacher/`);
        }catch(error){
            console.log(error);
            alert(error);
        }
    };

    return !isAdmin() ? (<Navigate to='/no-permission/' />) : (
        <Container style={{flexDirection: 'column', alignItems: 'center'}}>
            <h1 style={{paddingBottom: "20px", paddingTop: "60px"}}>
                Generate teachers
            </h1>
            <TextField
                id="no"
                label="No of teachers"
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
                onClick={generateTeachers}
            >
                Generate teachers
            </Button>
        </Container>
    );
};