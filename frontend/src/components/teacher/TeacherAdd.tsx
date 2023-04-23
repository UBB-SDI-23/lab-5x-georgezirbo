import {
	MenuItem, 
	Typography,
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Teacher } from "../../models/Teacher";
import { BACKEND_API_URL } from "../../../constants";

export const TeacherAdd = () => {
	const navigate = useNavigate();

    const [teacher, setTeacher] = useState<Teacher>({
        fname: "",
        lname: "",
        rank: "P"
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

    const addTeacher = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
        try {
            console.log(teacher);
            await axios.post(`${BACKEND_API_URL}teacher/`, teacher);
            navigate('/teacher/');
		} catch (error) {
			console.log(teacher)
            alert("The introduced teacher could not be added.")
			console.log(error);
		}
	};

	return (
        <Container>
            <h1 style={{paddingBottom: "25px", paddingTop: "60px"}}>
				Add Teacher
			</h1>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: "10px"}}>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/teacher/`}>
                    <ArrowBackIcon />
                </IconButton>{" "}
            </Box>
			<Card>
                <CardContent>
					<form onSubmit={addTeacher}>
						<TextField
							id="fname"
							label="First Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
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

						<Button type="submit" style={{ backgroundColor: "#808080", color: "#fff", width: "100%" }} disabled={!isFormValid}>Add Teacher</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};
