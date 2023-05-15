import React, {useState } from "react";
import {Button, TextField} from "@mui/material";
import {Navigate, useNavigate} from "react-router-dom";
import { Container } from "react-bootstrap";
import { BACKEND_API_URL } from "../../../constants";
import {getAccessToken, isAdmin} from "../utils";

export const GenerateUsers = () => {
    const navigate = useNavigate();
    const [no, setNo] = useState(0);

    const generateUsers = async (event: { preventDefault: () => void}) => {
        event.preventDefault();
        try{
            await fetch(`${BACKEND_API_URL}generate/users/?n=${no}`, { headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                }
            });
            navigate(`/users/`);
        }catch(error){
            console.log(error);
            alert(error);
        }
    };

    return !isAdmin() ? (<Navigate to='/no-permission/' />) : (
        <Container style={{flexDirection: 'column', alignItems: 'center'}}>
            <h1 style={{paddingBottom: "20px", paddingTop: "60px"}}>
                Generate users
            </h1>
            <TextField
                id="no"
                label="No of users"
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
                onClick={generateUsers}
            >
                Generate users
            </Button>
        </Container>
    );
};