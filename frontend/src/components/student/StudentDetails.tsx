import { Card, CardActions, CardContent, IconButton, Box } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Student } from "../../models/Student";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../../constants";
import { Tooltip } from "react-bootstrap";
import { List, ListItem, ListItemText, Grid } from "@mui/material";

export const StudentDetails = () => {
	const { studentID } = useParams();
    const [student, setStudent] = useState<Student>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

	useEffect(() => {
        const fetchStudent = async () => {
          setLoading(true);
          try {
              const response = await fetch(`${BACKEND_API_URL}student/${studentID}/`);
              console.log(response);
            const data = await response.json();
            setStudent(data);
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        };
        fetchStudent();
      }, [studentID]);

	return (
        <Container>
            <h1 style={{paddingBottom: "25px"}}>
			    Student Details
			</h1>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: "10px"}}>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/student/`}>
                    <ArrowBackIcon />
                </IconButton>{" "}
            </Box>
			<Card>
                <CardContent>
                    <p>First Name: {student?.fname}</p>
                    <p>Last Name: {student?.lname}</p>
                    <p>CNP: {student?.cnp}</p>
                    <p>Email: {student?.email}</p>
                    <p>Phone: {student?.phone}</p>
                    <p>Grades: </p>
                    <Grid container spacing={0} sx={{maxWidth: "300px", alignItems: "center"}}>
                        {student?.grades?.map((grade, index) => (
                        <Grid item xs={3} key={grade.gid}>
                            <ListItem>
                            <ListItemText primary={`${Math.max(grade.session, grade.retake)}`} />
                            </ListItem>
                        </Grid>
                        ))}
                    </Grid>
            </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<CardActions>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/student/${studentID}/edit/`}>
                        <Tooltip title="Edit student">
                        <EditIcon color="primary" />
                        </Tooltip>
                    </IconButton>
        
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/student/${studentID}/remove/`}>
                        <Tooltip title="Delete student">
                        <DeleteForeverIcon sx={{ color: "red" }} />
                        </Tooltip>
                </IconButton>
                </CardActions>
                </Box>
			</Card>
		</Container>
	);
};
