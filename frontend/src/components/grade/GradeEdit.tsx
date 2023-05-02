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
import { Grade } from "../../models/Grade";
import { Student } from "../../models/Student";
import { Course } from "../../models/Course";
import { debounce } from "lodash";

export const GradeEdit = () => {
    const navigate = useNavigate();
    const { gradeID } = useParams();

    const [students, setStudents] = useState<Student[]>([]);
	const [courses, setCourses] = useState<Course[]>([]);
	const [grade, setGrade] = useState<Grade>({
        session: 0,
        retake: 0
	});

	const fetchStudentSuggestions = async (query: string) => {
		try {
			const response = await axios.get<Student[]>(
				`${BACKEND_API_URL}student/autocomplete/?query=${query}`
			);
			const data = await response.data;
			setStudents(data);
		} catch (error) {
			console.error("Error fetching suggestions:", error);
		}
	};

	const fetchCourseSuggestions = async (query: string) => {
		try {
			const response = await axios.get<Course[]>(
				`${BACKEND_API_URL}course/autocomplete/?query=${query}`
			);
			const data = await response.data;
			setCourses(data);
		} catch (error) {
			console.error("Error fetching suggestions:", error);
		}
	};

	const debouncedFetchStudentSuggestions = useCallback(debounce(fetchStudentSuggestions, 500), []);
	const debouncedFetchCourseSuggestions = useCallback(debounce(fetchCourseSuggestions, 500), []);

	useEffect(() => {
		return () => {
			debouncedFetchStudentSuggestions.cancel();
			debouncedFetchCourseSuggestions.cancel();
		};
	}, [debouncedFetchStudentSuggestions, debouncedFetchCourseSuggestions]);

	const handleStudentChange = (event: any, value: any, reason: any) => {
		console.log("input", value, reason);

		if (reason === "input") {
			debouncedFetchStudentSuggestions(value);
		}
	};

	const handleCourseChange = (event: any, value: any, reason: any) => {
		console.log("input", value, reason);

		if (reason === "input") {
			debouncedFetchCourseSuggestions(value);
		}
	};
    
      const isSessionValid = grade.session >= 0 && grade.session <= 10 && grade.session;
      const isRetakeValid = (grade.retake >= 0 && grade.retake <= 10 && grade.retake) || !grade.retake;
      const isFormValid = isSessionValid && isRetakeValid;
      const [validateSession, setValidateSession] = useState(false);
      const [validateRetake, setValidateRetake] = useState(false);
    
    useEffect(() => {
        const fetchGrade =async () => {
            try{
                const response = await fetch(`${BACKEND_API_URL}grade/${gradeID}/`);
                const grade = await response.json();
                setGrade(grade);
            } catch (error) {
                console.log(error);
                alert(error);
            }
        };
        fetchGrade();
        fetchCourseSuggestions('');
        fetchStudentSuggestions('');
    }, []);


    const editGrade = async (event: { preventDefault: () => void}) => {
        event.preventDefault();
        try{
            await axios.put(`${BACKEND_API_URL}grade/${gradeID}/`, grade);
            navigate(`/grade/`);
        }catch(error){
            console.log(error);
            alert(error);
        }
    };

	return (
        <Container>
            <h1 style={{paddingBottom: "25px"}}>
				Edit Grade
			</h1>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: "10px"}}>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/grade/`}>
                    <ArrowBackIcon />
                </IconButton>{" "}
            </Box>
			<Card>
                <CardContent>
					<form onSubmit={editGrade}>
                        <Autocomplete
							id="course"
							options={courses}
							getOptionLabel={(option) => `${option.name} @ ${option.university} - ${option.faculty}]: (${option.year})`}
							renderInput={(params) => <TextField {...params} label="Course" variant="outlined" placeholder={grade.course_name} sx={{ mb: 2 }}/>}
							filterOptions={(x) => x}
							onInputChange={handleCourseChange}
							onChange={(event, value) => {
								if (value) {
									console.log(value);
									setGrade({ ...grade, course: value.cid });
								}
								else {
									setGrade({ ...grade, course: 0})
								}
							}}
							isOptionEqualToValue={(option, value) => option.cid === value.cid}
						/>
						<Autocomplete
							id="student"
							options={students}
							getOptionLabel={(option) => `${option.fname} ${option.lname} [${option.cnp}]`}
							renderInput={(params) => <TextField {...params} label="Student" variant="outlined" sx={{ mb: 2 }}/>}
							filterOptions={(x) => x}
							onInputChange={handleStudentChange}
							onChange={(event, value) => {
								if (value) {
									console.log(value);
									setGrade({ ...grade, student: value.sid });
								}
								else {
									setGrade({ ...grade, student: 0})
								}
							}}
							isOptionEqualToValue={(option, value) => option.sid === value.sid}
						/>
                        <TextField
							id="session"
							label="Session"
							variant="outlined"
							fullWidth
                            sx={{ mb: 2 }}
                            value={grade.session}
							onChange={(event) => setGrade({ ...grade, session: parseFloat(event.target.value)?parseFloat(event.target.value):0})}
							error={validateSession && !isSessionValid}
							helperText={validateSession && !isSessionValid ? 'Invalid session.':''}
							onFocus={() => setValidateSession(true)}
						/>
						<TextField
							id="retake"
							label="Retake"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
                            value={grade.retake}
							onChange={(event) => setGrade({ ...grade, retake: parseFloat(event.target.value)?parseFloat(event.target.value):0})}
							error={validateRetake && !isRetakeValid}
							helperText={validateRetake && !isRetakeValid ? 'Invalid retake.':''}
							onFocus={() => setValidateRetake(true)}
						/>
						<Button type="submit" style={{ backgroundColor: "#808080", color: "#fff", width: "100%" }} disabled={!isFormValid}>Edit Grade</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};
