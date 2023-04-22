import {
	Autocomplete,
	Button,
	Card,
	CardActions,
	CardContent,
	IconButton,
    TextField,
    Box
} from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Course } from "../../models/Course";

export const CourseEdit = () => {
    const navigate = useNavigate();
    const { courseID } = useParams();

    const [course, setCourse] = useState<Course>({
        name: "",
        university: "",
        faculty: "",
        department: "",
        year: "",
    });
    
    useEffect(() => {
        const fetchCourse =async () => {
            try{
                const response = await fetch(`${BACKEND_API_URL}course/${courseID}/`);
                const course = await response.json();
                setCourse(course);
            } catch (error) {
                console.log(error);
                alert(error);
            }
        };
        fetchCourse();
    }, []);


    const editCourse = async (event: { preventDefault: () => void}) => {
        event.preventDefault();
        try{
            await axios.put(`${BACKEND_API_URL}course/${courseID}/`, course);
            navigate(`/course/`);
        }catch(error){
            console.log(error);
            alert(error);
        }
    };

	return (
        <Container>
            <h1 style={{paddingBottom: "25px"}}>
				Edit Course
			</h1>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: "10px"}}>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/course/`}>
                    <ArrowBackIcon />
                </IconButton>{" "}
            </Box>
			<Card>
                <CardContent>
					<form onSubmit={editCourse}>
                    <TextField
							id="name"
							label="Name"
							variant="outlined"
                            fullWidth
                            value={course.name}
							sx={{ mb: 2 }}
							onChange={(event) => setCourse({ ...course, name: event.target.value })}
						/>
						<TextField
							id="univeristy"
							label="University"
							variant="outlined"
                            fullWidth
                            value={course.university}
							sx={{ mb: 2 }}
							onChange={(event) => setCourse({ ...course, university: event.target.value })}
                        />
                        <TextField
							id="faculty"
							label="Faculty"
							variant="outlined"
                            fullWidth
                            value={course.faculty}
							sx={{ mb: 2 }}
							onChange={(event) => setCourse({ ...course, faculty: event.target.value })}
						/>
						<TextField
							id="department"
							label="Department"
							variant="outlined"
                            fullWidth
                            value={course.department}
							sx={{ mb: 2 }}
							onChange={(event) => setCourse({ ...course, department: event.target.value })}
						/>
						<TextField
							id="year"
							label="Year"
							variant="outlined"
                            fullWidth
                            value={course.year}
							sx={{ mb: 2 }}
							onChange={(event) => setCourse({ ...course, year: event.target.value })}
                        />
						<Button type="submit">Edit Course</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};
