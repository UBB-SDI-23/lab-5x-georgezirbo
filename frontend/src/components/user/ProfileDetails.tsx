import {Card, CardActions, CardContent, IconButton, Box, Button} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import { Profile } from "../../models/Profile";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../../constants";
import { Tooltip } from "react-bootstrap";
import { List, ListItem, ListItemText, Grid } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import {logOut} from "../utils";


export const ProfileDetails = () => {
	const { username } = useParams();
    const [profile, setProfile] = useState<Profile>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

	useEffect(() => {
        const fetchProfile = async () => {
          setLoading(true);
          try {
              const response = await fetch(`${BACKEND_API_URL}profile/${username}/`);
              console.log(response);
              const data = await response.json();
              setProfile(data);
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        };
        fetchProfile();
      }, [username]);

	// @ts-ignore
    return (
        <Container style={{paddingTop: 100}}>
            <h1>
			    Profile Details
			</h1>
			<Card>
                <CardContent>
                    <p><b>First Name</b>: {profile?.fname}</p>
                    <p><b>Last Name</b>: {profile?.lname}</p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <p style={{ maxWidth: 300, margin: "0 0"  }}>
                            <b>Bio</b>: {profile?.bio}
                        </p>
                    </div>
                    <p><b>Gender</b>: {profile?.gender}</p>
                    <p><b>Age</b>: {profile?.age}</p>
                    <p><b># of students</b>: {profile?.no_students}</p>
                    <p><b># of grades</b>: {profile?.no_grades}</p>
                    <p><b># of courses</b>: {profile?.no_courses}</p>
                    <p><b># of teacher</b>: {profile?.no_teacher}</p>
                </CardContent>
                <Button style={{ backgroundColor: "#808080", color: "#fff", width: "100%" }} type="submit" onClick={()=>{logOut(); navigate('/login/')}}>
                    Log Out
                </Button>
			</Card>
		</Container>
	);
};
