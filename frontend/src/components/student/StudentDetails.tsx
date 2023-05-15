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
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import {getUsername, isModerator} from "../utils";


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

	// @ts-ignore
    return (
        <Container style={{paddingTop: 100}}>
            <h1>
			    Student Details
			</h1>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: "10px"}}>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/student/`}>
                    <ArrowBackIcon />
                </IconButton>{" "}
            </Box>
			<Card>
                <CardContent>
                    <p><b>First Name</b>: {student?.fname}</p>
                    <p><b>Last Name</b>: {student?.lname}</p>
                    <p><b>CNP</b>: {student?.cnp}</p>
                    <p><b>Email</b>: {student?.email}</p>
                    <p><b>Phone</b>: {student?.phone}</p>
                    <p style={{ marginBottom: 0, fontWeight: 'bold'}}>Grades: </p>
                    {student?.grades && student.grades.length > 0 &&
                    <TableContainer style={{ maxHeight: 325 , marginTop: 15}}>
                        <Table style={{ border: '1px solid gray' }}>
                            <TableHead sx={{ bgcolor: 'grey.400'}}>
                                <TableRow>
                                    <TableCell style={{ borderRight: '1px solid gray' }}>Course Name</TableCell>
                                    <TableCell align="center">Grade</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {student?.grades?.map((grade) => (
                                    <TableRow key={grade.gid}>
                                        <TableCell style={{ borderRight: '1px solid gray' }}>{grade.course_name}</TableCell>
                                        <TableCell align="center">{Math.max(grade.session, grade.retake)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    }
            </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<CardActions>
                    {student?.username === getUsername() || isModerator() ? (
                    <Box>
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
                    </Box>): null}
                </CardActions>
                </Box>
			</Card>
		</Container>
	);
};
