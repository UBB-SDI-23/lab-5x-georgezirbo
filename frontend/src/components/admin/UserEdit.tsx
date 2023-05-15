import {
    Autocomplete,
    Button,
    Card,
    CardActions,
    CardContent,
    IconButton,
    TextField,
    MenuItem,
    Typography,
    Box
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import { BACKEND_API_URL } from "../../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { User } from "../../models/User";
import {getAccessToken, isAdmin} from "../utils";

export const UserEdit = () => {
    const navigate = useNavigate();
    const { userID } = useParams();

    const [user, setUser] = useState<User>(
        {
            is_active: false,
            is_superuser: false,
            password: "",
            role: "",
            username: "",
            is_staff:false
        }
    );

    function getRole(user : User) {
        if (user.is_superuser){
            return 'admin';
        } else if (user.is_staff) {
            return 'moderator';
        } else {
            return 'user';
        }
    }

    function setRole(role : string) {
        if (role === 'admin'){
            setUser({...user, is_active: true, is_staff: true, is_superuser: true});
        } else if (role === 'moderator') {
            setUser({...user, is_active: true, is_staff: true, is_superuser: false});
        } else {
            setUser({...user, is_active: true, is_staff: false, is_superuser: false});
        }
    }


    useEffect(() => {
        const fetchUser =async () => {
            try{
                const response = await fetch(`${BACKEND_API_URL}user/${userID}/`, { headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                    }
                });
                const user = await response.json();
                setUser(user);
            } catch (error) {
                console.log(error);
                alert(error);
            }
        };
        fetchUser();
    }, []);


    const editUser = async (event: { preventDefault: () => void}) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}user/${userID}/`, user,{ headers: {
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
        <Container>
            <h1 style={{paddingBottom: "25px"}}>
                Edit User
            </h1>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: "10px"}}>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/users/`}>
                    <ArrowBackIcon />
                </IconButton>{" "}
            </Box>
            <Card>
                <CardContent>
                    <form onSubmit={editUser}>
                        <TextField
                            id="username"
                            label="Username"
                            variant="outlined"
                            fullWidth
                            value={user.username}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{ mb: 2, textAlign: 'center' }}
                        />
                        <TextField
                            id="role"
                            label="Role"
                            variant="outlined"
                            fullWidth
                            select
                            sx={{ mb: 2, textAlign: "left" }}
                            onChange={(event) => { setRole(event.target.value) }}
                            value={getRole(user)}
                        >
                            <MenuItem value="admin" onClick={() => setRole('admin')}>Admin</MenuItem>
                            <MenuItem value="moderator" onClick={() => setRole('moderator')}>Moderator</MenuItem>
                            <MenuItem value="user" onClick={() => setRole('user')}>User</MenuItem>
                        </TextField>

                        <Button type="submit" style={{ backgroundColor: "#808080", color: "#fff", width: "100%" }}>Edit User</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};
