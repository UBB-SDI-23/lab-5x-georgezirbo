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
import React, { useCallback, useEffect, useState } from "react";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Course } from "../../models/Course";
import { Teacher } from "../../models/Teacher";
import { BACKEND_API_URL } from "../../../constants";
import { debounce } from "lodash";
import {getAccessToken, getUser, isAdmin, isUser} from "../utils";

export const CourseAdd = () => {
	const navigate = useNavigate();

	const [teachers, setTeachers] = useState<Teacher[]>([]);
	const [course, setCourse] = useState<Course>({
		name: "",
        university: "",
        faculty: "",
		department: "",
		year: "",
		teacher: 0,
		user: getUser()
	});
	
	const isNameValid = course.name != "";
	const isUniversityValid = course.university != "";
	const isFacultyValid = course.faculty != "";
	const isDepartmentValid = course.department != "";
	const isYearValid = parseInt(course.year) >= 2000 && parseInt(course.year) <= 2023;
	const isFormValid = isNameValid && isUniversityValid && isFacultyValid && isDepartmentValid && isYearValid;
	const [validateName, setValidateName] = useState(false);
	const [validateUniversity, setValidateUniversity] = useState(false);
	const [validateFaculty, setValidateFaculty] = useState(false);
	const [validateDepartment, setValidateDepartment] = useState(false);
	const [validateYear, setValidateYear] = useState(false);

	const fetchSuggestions = async (query: string) => {
		try {
			const response = await axios.get<Teacher[]>(
				`${BACKEND_API_URL}teacher/autocomplete/?query=${query}`, {
				headers: {
					Authorization: `Bearer ${getAccessToken()}`,
				},
			});
			const data = await response.data;
			setTeachers(data);
		} catch (error) {
			console.error("Error fetching suggestions:", error);
		}
	};
	

	const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), []);

	useEffect(() => {
		return () => {
			debouncedFetchSuggestions.cancel();
		};
	}, [debouncedFetchSuggestions]);

	const handleInputChange = (event: any, value: any, reason: any) => {
		console.log("input", value, reason);

		if (reason === "input") {
			debouncedFetchSuggestions(value);
		}
	};

    const addCourse = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
        try {
            console.log(course);
            const response = await axios.post(`${BACKEND_API_URL}course/`, course, {
				headers: {
					Authorization: `Bearer ${getAccessToken()}`,
				},
			});
            const cid = response.data.cid
			navigate(`/course/${cid}/details`);
		} catch (error) {
            alert("The introduced course could not be added.")
			console.log(error);
		}
	};

	return !isUser() ? (<Navigate to='/no-permission/' />) : (
        <Container>
            <h1 style={{paddingBottom: "25px", paddingTop: "60px"}}>
				Add Course
			</h1>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: "10px"}}>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/course/`}>
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
							error={validateName && !isNameValid}
							helperText={validateName && !isNameValid ? 'Invalid name.':''}
							onFocus={() => setValidateName(true)}
						/>
						<TextField
							id="univeristy"
							label="University"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCourse({ ...course, university: event.target.value })}
							error={validateUniversity && !isUniversityValid}
							helperText={validateUniversity && !isUniversityValid ? 'Invalid university.':''}
							onFocus={() => setValidateUniversity(true)}
                        />
                        <TextField
							id="faculty"
							label="Faculty"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCourse({ ...course, faculty: event.target.value })}
							error={validateFaculty && !isFacultyValid}
							helperText={validateFaculty && !isFacultyValid ? 'Invalid faculty.':''}
							onFocus={() => setValidateFaculty(true)}
						/>
						<TextField
							id="department"
							label="Department"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCourse({ ...course, department: event.target.value })}
							error={validateDepartment && !isDepartmentValid}
							helperText={validateDepartment && !isDepartmentValid ? 'Invalid department.':''}
							onFocus={() => setValidateDepartment(true)}
						/>
						<TextField
							id="year"
							label="Year"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCourse({ ...course, year: event.target.value })}
							type="number"
							inputProps={{ min: 2000, max: 2023 }}
							error={validateYear && !isYearValid}
							helperText={validateYear && !isYearValid ? 'Invalid year.' : ''}
							onFocus={() => setValidateYear(true)}
						/>
						<Autocomplete
							id="teacher"
							options={teachers}
							getOptionLabel={(option) => `${option.fname} ${option.lname} [${option.rank}]`}
							renderInput={(params) => <TextField {...params} label="Teacher" variant="outlined" sx={{ mb: 2 }}/>}
							filterOptions={(x) => x}
							onInputChange={handleInputChange}
							onChange={(event, value) => {
								if (value) {
									console.log(value);
									setCourse({ ...course, teacher: value.tid });
								}
								else {
									setCourse({ ...course, teacher: 0})
								}
							}}
							isOptionEqualToValue={(option, value) => option.tid === value.tid}
							onFocus={() => {if (!course.teacher)fetchSuggestions('')} }
						/>
						<Button type="submit" style={{ backgroundColor: "#808080", color: "#fff", width: "100%" }} disabled={!isFormValid}>Add Course</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};
