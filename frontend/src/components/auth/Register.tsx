import React, { useState } from 'react';
import {Container} from '@mui/system'
import {TextField, Button, CardActions, CardContent, Card, IconButton, Box} from '@mui/material';
import axios from "axios";
import {BACKEND_API_URL} from "../../../constants";
import {Course} from "../../models/Course";
import {User} from "../../models/User";
import {Link, useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import jwt_decode from "jwt-decode";
import {Token} from "../../models/Token";
import {Profiler} from "inspector";
import {Profile} from "../../models/Profile";
export const Register = () => {
    //const classes = useStyles();
    const navigate = useNavigate();
    const [user, setUser] = useState<User>({
        username: "",
        password: ""
    });
    const [profile, setProfile] = useState<Profile>({
        user: 0,
        fname: "",
        lname: "",
        bio: "",
        gender: "",
        age: 0
    });

    const [token, setToken] = useState<Token>();
    const [confirm, setConfirm] = useState<string>('');

    const [touchedFields, setTouchedFields] = useState<{ username: boolean, password: boolean, fname: boolean,
                                                        lname: boolean, bio: boolean, gender: boolean, age: boolean }>({
        username: false,
        password: false,
        fname: false,
        lname: false,
        bio: false,
        gender: false,
        age: false
    });

    const isFirstNameValid = profile.fname != "";
    const isLastNameValid = profile.lname != "";
    const isGenderValid = profile.gender?.match(/^[FM]$/);
    const isAgeValid = profile.age && profile?.age > 0;
    const isUsernameValid = user.username.match(/^[a-zA-Z0-9_]+$/)
    const isPasswordValid = user.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9_]+$/)
    const isFormValid = isUsernameValid && isPasswordValid && isFirstNameValid &&
                                                    isLastNameValid && isGenderValid && isAgeValid;

    const register = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            console.log(profile);
            const response = await axios.post(`${BACKEND_API_URL}register/`, user);
            setConfirm(response.data.confirmation_code);
        } catch (error) {
            alert("There username was taken. Choose another one.");
            console.log(error);
        }

    };
    const activate = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            const response = await axios.get(`${BACKEND_API_URL}register/confirm/?username=${user.username}&confirmation_code=${confirm}`);
            console.log(response.data);
        } catch (error) {
            alert("Unfortunately. The account could not be activated.");
            console.log(error);
        }

        try {
            const response = await axios.post(`${BACKEND_API_URL}token/`, user);
            console.log(response.data);
            console.log(jwt_decode(response.data.access));
            const user_id = (jwt_decode(response.data.access) as { user_id: string }).user_id;
            profile.user = parseInt(user_id);
            localStorage.setItem('token', JSON.stringify(response.data));
            localStorage.setItem('username', user.username);
        } catch (error) {
            alert("There is no active user with these credentials.");
            console.log(error);
        }

        try {
            console.log(profile)
            const response = await axios.put(`${BACKEND_API_URL}profile/${user.username}/`, profile);
            console.log(response.data);
            navigate(`/profile/${user.username}/`);
        } catch (error) {
            alert("A profile for this user could not be created.");
            console.log(error);
        }

    };


    return (
        !confirm ? (<Container maxWidth="sm">
            <h1 style={{paddingBottom: "25px", paddingTop: "60px"}}>
                Register
            </h1>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: "10px"}}>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/`}>
                    <ArrowBackIcon />
                </IconButton>{" "}
            </Box>
            <Card>
                <CardContent>
                    <form onSubmit={register}>
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
                        <TextField
                            label="Firstname"
                            variant="outlined"
                            sx={{ mb: 2 }}
                            fullWidth
                            value={profile.fname}
                            onChange={(e) => setProfile({ ...profile, fname: e.target.value })}
                            onFocus={(e) => setTouchedFields({...touchedFields, fname: true})}
                            required
                            error={touchedFields.fname && !isFirstNameValid}
                            helperText={touchedFields.fname && !isFirstNameValid ? 'Invalid fname. ' : ''}
                        />
                        <TextField
                            label="Lastname"
                            variant="outlined"
                            sx={{ mb: 2 }}
                            fullWidth
                            value={profile.lname}
                            onChange={(e) => setProfile({ ...profile, lname: e.target.value })}
                            onFocus={(e) => setTouchedFields({...touchedFields, lname: true})}
                            required
                            error={touchedFields.lname && !isLastNameValid}
                            helperText={touchedFields.lname && !isLastNameValid ? 'Invalid lname. ' : ''}
                        />
                        <TextField
                            label="Bio"
                            variant="outlined"
                            sx={{ mb: 2 }}
                            fullWidth
                            value={profile.bio}
                            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                            onFocus={(e) => setTouchedFields({...touchedFields, bio: true})}
                        />
                        <TextField
                            label="Gender"
                            variant="outlined"
                            sx={{ mb: 2 }}
                            fullWidth
                            value={profile.gender}
                            onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                            onFocus={(e) => setTouchedFields({...touchedFields, gender: true})}
                            required
                            error={touchedFields.gender && !isGenderValid}
                            helperText={touchedFields.gender && !isGenderValid ? 'Invalid gender. Possible values: M, F.' : ''}
                        />
                        <TextField
                            label="Age"
                            variant="outlined"
                            sx={{ mb: 2 }}
                            fullWidth
                            value={profile.age}
                            onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) })}
                            onFocus={(e) => setTouchedFields({...touchedFields, age: true})}
                            required
                            error={touchedFields.age && !isAgeValid}
                            helperText={touchedFields.age && !isAgeValid ? 'Invalid age.' : ''}
                        />
                        <Button style={{ backgroundColor: "#808080", color: "#fff", width: "100%" }} type="submit" disabled={!isFormValid}>
                            Register
                        </Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>) :
        (<Container>
            <Button style={{ backgroundColor: "#808080", color: "#fff" }} sx={{ height: '100px', width: '300px' }} onClick={(e)=>activate(e)}>
                Activate the account
            </Button>
        </Container>)

    );
};

