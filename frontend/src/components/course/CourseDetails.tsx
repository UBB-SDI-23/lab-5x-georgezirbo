import { Card, CardActions, CardContent, IconButton, Box } from "@mui/material";
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
        <Container>
            <h1 style={{paddingBottom: "25px"}}>
			    Course Details
			</h1>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: "10px"}}>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/course/`}>
                    <ArrowBackIcon />
                </IconButton>{" "}
            </Box>
			<Card>
                <CardContent>
                    <p>Name: {course?.name}</p>
                    <p>University: {course?.university}</p>
                    <p>Faculty: {course?.faculty}</p>
                    <p>Department: {course?.department}</p>
                    <p>Year: {course?.year}</p>
                    {/* <p>Teacher: {course?.teacher}</p> */}
                    <p style={{ marginBottom: 0, fontWeight: 'bold'}}>Grades: </p>
                    <List>
                        {course?.grades?.map((grade) => (
                            <ListItem style={{ display: 'flex', justifyContent: 'center' }} key={grade.gid}>
                                {grade.student_fname + " " + grade.student_lname + ': ' + Math.max(grade.session, grade.retake)}
                            </ListItem>
                        ))}
                    </List>
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
