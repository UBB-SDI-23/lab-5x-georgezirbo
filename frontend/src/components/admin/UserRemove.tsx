import { Container, Card, CardContent, IconButton, CardActions, Button } from "@mui/material";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../../constants";
import {isAdmin} from "../utils";
import React from "react";

export const UserRemove = () => {
    const { userID } = useParams();
    const navigate = useNavigate();

    const handleDelete = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.delete(`${BACKEND_API_URL}user/${userID}/`);
            navigate('/users/');
        } catch (error) {
            console.log(error);
            alert('An error occurred while deleting the admin.');
        }
    };

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/users/");
    };

    return !isAdmin() ? (<Navigate to='/no-permission/' />) : (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/users`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    Are you sure you want to delete this user?
                 </CardContent>
                 <CardActions>
                    <Button sx={{color: "red"}}
                        onClick={ handleDelete } > Delete it</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </CardActions>
            </Card>
        </Container>
);
};
