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

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Course } from "../../models/Course";
import { BACKEND_API_URL } from "../../../constants";

export const CourseAdd = () => {
	const navigate = useNavigate();

	const [course, setCourse] = useState<Course>({
		name: "",
        university: "",
        faculty: "",
        department: "",
        year: "",
      });

    const addCourse = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
        try {
            console.log(course);
            await axios.post(`${BACKEND_API_URL}course/`, course);
            navigate('/course/');
        } catch (error) {
            alert("The introduced course could not be added.")
			console.log(error);
		}
	};

	return (
        <Container>
            <h1 style={{paddingBottom: "25px", paddingTop: "60px"}}>
				Add Course
			</h1>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: "10px"}}>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/student/`}>
                    <ArrowBackIcon />
                </IconButton>{" "}
            </Box>
			<Card>
                <CardContent>
					<form onSubmit={addCourse}>
						<TextField
							id="name"
							label="Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCourse({ ...course, name: event.target.value })}
						/>
						<TextField
							id="univeristy"
							label="University"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCourse({ ...course, university: event.target.value })}
                        />
                        <TextField
							id="faculty"
							label="Faculty"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCourse({ ...course, faculty: event.target.value })}
						/>
						<TextField
							id="department"
							label="Department"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCourse({ ...course, department: event.target.value })}
						/>
						<TextField
							id="year"
							label="Year"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCourse({ ...course, year: event.target.value })}
                        />
						<Button type="submit">Add Course</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};
