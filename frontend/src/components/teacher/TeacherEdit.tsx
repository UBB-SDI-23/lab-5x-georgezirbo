import {
	Autocomplete,
	Button,
	Card,
	CardActions,
	CardContent,
	IconButton,
    TextField,
    MenuItem,
    Typography,
    Box
} from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Teacher } from "../../models/Teacher";

export const TeacherEdit = () => {
    const navigate = useNavigate();
    const { teacherID } = useParams();

    const [teacher, setTeacher] = useState<Teacher>({
        fname: "",
        lname: "",
        rank: "",
        descr: ""
    });

    const getKey: {[key: string]: string} = {
        "Professor": "P",
        "Lecturer": "L",
		"Associate": "A",
    };

    const isFnameValid = teacher.fname != "";
	const isLnameValid = teacher.lname != "";
	const [validateFname, setValidateFname] = useState(false);
	const [validateLname, setValidateLname] = useState(false);
	const isFormValid = isFnameValid && isLnameValid;
    
    useEffect(() => {
        const fetchTeacher =async () => {
            try{
                const response = await fetch(`${BACKEND_API_URL}teacher/${teacherID}/`);
                const teacher = await response.json();
                setTeacher(teacher);
            } catch (error) {
                console.log(error);
                alert(error);
            }
        };
        fetchTeacher();
    }, []);


    const editTeacher = async (event: { preventDefault: () => void}) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}teacher/${teacherID}/`, teacher);
            navigate(`/teacher/${teacherID}/details/`);
        }catch(error){
            console.log(error);
            alert(error);
        }
    };

	return (
        <Container>
            <h1 style={{paddingBottom: "25px"}}>
				Edit Teacher
			</h1>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: "10px"}}>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/teacher/`}>
                    <ArrowBackIcon />
                </IconButton>{" "}
            </Box>
			<Card>
                <CardContent>
					<form onSubmit={editTeacher}>
						<TextField
							id="fname"
							label="First Name"
							variant="outlined"
                            fullWidth
                            value={teacher.fname}
							sx={{ mb: 2, textAlign: 'center' }}
                            onChange={(event) => setTeacher({ ...teacher, fname: event.target.value })}
                            error={validateFname && !isFnameValid}
							helperText={validateFname && !isFnameValid ? 'Invalid first name.':''}
							onFocus={() => setValidateFname(true)}
						/>
						<TextField
                            id="lname"
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            value={teacher.lname}
                            sx={{ mb: 2 }}
                            onChange={(event) => setTeacher({ ...teacher, lname: event.target.value })}
                            error={validateLname && !isLnameValid}
							helperText={validateLname && !isLnameValid ? 'Invalid last name.':''}
							onFocus={() => setValidateLname(true)}
                        />
                        <TextField
                            id="rank"
                            label="Rank"
                            variant="outlined"
							fullWidth
                            select
                            sx={{ mb: 2, textAlign: "left" }}
							onChange={(event) => { setTeacher({ ...teacher, rank: getKey[event.target.value] })}}
							value={Object.keys(getKey).find(key => getKey[key] === teacher.rank) || 'Professor'}
                        >
                            <MenuItem value="Professor" onClick={() => teacher.rank = 'P'}>Professor</MenuItem>
							<MenuItem value="Lecturer" onClick={() => teacher.rank = 'L'}>Lecturer</MenuItem>
							<MenuItem value="Associate" onClick={() => teacher.rank = 'A'}>Associate</MenuItem>
						</TextField>
                        <TextField
                            id="descr"
                            label="Description"
                            variant="outlined"
                            value={teacher.descr}
                            fullWidth
                            sx={{ mb: 2}}
                            onChange={(event) => setTeacher({ ...teacher, descr: event.target.value })}
                        />

						<Button type="submit" style={{ backgroundColor: "#808080", color: "#fff", width: "100%" }} disabled={!isFormValid}>Edit Teacher</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};
