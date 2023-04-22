import { Card, CardActions, CardContent, IconButton, Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Teacher } from "../../models/Teacher";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../../constants";
import { Tooltip } from "react-bootstrap";
import { List, ListItem, ListItemText, Grid } from "@mui/material";

export const TeacherDetails = () => {
	const { teacherID } = useParams();
    const [teacher, setTeacher] = useState<Teacher>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

	useEffect(() => {
        const fetchTeacher = async () => {
          setLoading(true);
          try {
              const response = await fetch(`${BACKEND_API_URL}teacher/${teacherID}/`);
              console.log(response);
            const data = await response.json();
            setTeacher(data);
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        };
        fetchTeacher();
    }, [teacherID]);
    
    const getValue: {[key: string]: string} = {
        "P": "Professor",
        "L": "Lecturer",
        "A": "Associate"
      };      

	return (
        <Container>
            <h1 style={{paddingBottom: "25px"}}>
			    Teacher Details
			</h1>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: "10px"}}>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/teacher/`}>
                    <ArrowBackIcon />
                </IconButton>{" "}
            </Box>
			<Card>
                <CardContent>
                    <p>First Name: {teacher?.fname}</p>
                    <p>Last Name: {teacher?.lname}</p>
                    <p>Rank: {teacher ? getValue[teacher.rank] : ""}</p>
                    <p style={{ marginBottom: 0, fontWeight: 'bold'}}>Courses: </p>
                    <List>
                        {teacher?.courses?.map((course) => (
                            <ListItem style={{display:'flex', justifyContent:'center'}} key={course.cid}>{course.name}</ListItem>
                        ))}
                    </List>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<CardActions>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/teacher/${teacherID}/edit/`}>
                        <Tooltip title="Edit teacher">
                        <EditIcon color="primary" />
                        </Tooltip>
                    </IconButton>
        
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/teacher/${teacherID}/remove/`}>
                        <Tooltip title="Delete teacher">
                        <DeleteForeverIcon sx={{ color: "red" }} />
                        </Tooltip>
                </IconButton>
                </CardActions>
                </Box>
			</Card>
		</Container>
	);
};
