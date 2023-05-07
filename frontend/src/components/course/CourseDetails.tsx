import {
    Card,
    CardActions,
    CardContent,
    IconButton,
    Box,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody, TableContainer
} from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Course } from "../../models/Course";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../../constants";
import { Tooltip } from "react-bootstrap";
import { List, ListItem, ListItemText, Grid } from "@mui/material";

export const CourseDetails = () => {
	const { courseID } = useParams();
    const [course, setCourse] = useState<Course>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

	useEffect(() => {
        const fetchCourse = async () => {
          setLoading(true);
          try {
              const response = await fetch(`${BACKEND_API_URL}course/${courseID}/`);
              console.log(response);
            const data = await response.json();
            setCourse(data);
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        };
        fetchCourse();
      }, [courseID]);

	return (
        <Container style={{paddingTop: 100}}>
            <h1>
			    Course Details
			</h1>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: "10px"}}>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/course/`}>
                    <ArrowBackIcon />
                </IconButton>{" "}
            </Box>
			<Card>
                <CardContent>
                    <p><b>Name</b>: {course?.name}</p>
                    <p><b>University</b>: {course?.university}</p>
                    <p><b>Faculty</b>: {course?.faculty}</p>
                    <p><b>Department</b>: {course?.department}</p>
                    <p><b>Year</b>: {course?.year}</p>
                    <p><b>Teacher</b>: {course?.teacher_name}</p>
                    <p style={{ marginBottom: 0, fontWeight: 'bold'}}>Grades: </p>
                    {course?.grades && course.grades.length > 0 &&
                    <TableContainer style={{ maxHeight: 325 , marginTop: 15}}>
                        <Table style={{ border: '1px solid gray' }}>
                            <TableHead sx={{ bgcolor: 'grey.400'}}>
                                <TableRow>
                                    <TableCell style={{ borderRight: '1px solid gray' }}>Student</TableCell>
                                    <TableCell align="center">Grade</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {course?.grades?.map((grade) => (
                                    <TableRow key={grade.gid}>
                                        <TableCell style={{ borderRight: '1px solid gray' }}>{grade.student_name}</TableCell>
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
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/course/${courseID}/edit/`}>
                        <Tooltip title="Edit course">
                        <EditIcon color="primary" />
                        </Tooltip>
                    </IconButton>
        
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/course/${courseID}/remove/`}>
                        <Tooltip title="Delete course">
                        <DeleteForeverIcon sx={{ color: "red" }} />
                        </Tooltip>
                </IconButton>
                </CardActions>
                </Box>
			</Card>
		</Container>
	);
};
