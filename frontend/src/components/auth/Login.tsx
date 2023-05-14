import React, { useState } from 'react';
import {Container} from '@mui/system'
import {TextField, Button, CardActions, CardContent, Card, IconButton, Box} from '@mui/material';
import axios from "axios";
import {BACKEND_API_URL} from "../../../constants";
import {Course} from "../../models/Course";
import {User} from "../../models/User";
import {Link, Navigate, useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import jwt_decode from "jwt-decode";
import {Token} from "../../models/Token";
import {isUser} from "../utils";

export const Login = () => {
    //const classes = useStyles();
    const navigate = useNavigate();
    const [user, setUser] = useState<User>({
        username: "",
        password: ""
    });

    const [touchedFields, setTouchedFields] = useState<{ username: boolean, password: boolean }>({
        username: false,
        password: false
    });


    const isUsernameValid = user.username.match(/^.+$/)
    const isPasswordValid = user.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9_]+$/)
    const isFormValid = isUsernameValid && isPasswordValid;

    const submit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            console.log(`Username: ${user.username}, Password: ${user.password}`);
            const response = await axios.post(`${BACKEND_API_URL}token/`, user);
            console.log(response.data);
            localStorage.setItem('token', JSON.stringify(response.data));
            localStorage.setItem('auth', JSON.stringify(jwt_decode(response.data.access)));
            navigate(`/profile/${user.username}/`);
        } catch (error) {
            alert("There is no active admin with these credentials.");
            console.log(error);
        }
    };

    return isUser() ? (<Navigate to='/no-permission/' />) : (
        <Container maxWidth="sm">
            <h1 style={{paddingBottom: "25px", paddingTop: "60px"}}>
                Log In
            </h1>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: "10px"}}>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/`}>
                    <ArrowBackIcon />
                </IconButton>{" "}
            </Box>
            <Card>
                <CardContent>
                    <form onSubmit={submit}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            sx={{ mb: 2 }}
                            fullWidth
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            onFocus={(e) => setTouchedFields({...touchedFields, username: true})}
                            required
                            error={touchedFields.username && !isUsernameValid}
                            helperText={touchedFields.username && !isUsernameValid ? 'Invalid username. It should only contain alphanumerical characters or underscore.' : ''}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            sx={{ mb: 2 }}
                            fullWidth
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            onFocus={(e) => setTouchedFields({...touchedFields, password: true})}
                            required
                            error={touchedFields.password && !isPasswordValid}
                            helperText={touchedFields.password && !isPasswordValid ? 'Invalid password. It should contain at least a lowercase, uppercase, digit and no special characters.' : ''}
                        />

                        <Button
                            variant="contained"

                            type="submit" disabled={!isFormValid}
                            sx={{
                                width: "100%",
                                backgroundColor: "primary", color: "#fff",
                                "&:hover": {
                                    backgroundColor: "black",
                                    color: "white",
                                    borderColor: "white",
                                },
                            }}
                        >
                            Log In
                        </Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>);
};

