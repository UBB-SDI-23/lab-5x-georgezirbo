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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Teacher } from "../../models/Teacher";
import { BACKEND_API_URL } from "../../../constants";

export const TeacherAdd = () => {
	const navigate = useNavigate();

    const [teacher, setTeacher] = useState<Teacher>({
        fname: "",
        lname: "",
        rank: ""
      });

    const addTeacher = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
        try {
            console.log(teacher);
            await axios.post(`${BACKEND_API_URL}teacher/`, teacher);
            navigate('/teacher/');
        } catch (error) {
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
						/>
						<TextField
							id="lname"
							label="Last Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setTeacher({ ...teacher, lname: event.target.value })}
                        />
                        <TextField
							id="rank"
							label="Rank"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setTeacher({ ...teacher, rank: event.target.value })}
						/>
						<Button type="submit">Add Teacher</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};
