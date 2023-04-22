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
import { Grade } from "../../models/Grade";
import { BACKEND_API_URL } from "../../../constants";

export const GradeAdd = () => {
	const navigate = useNavigate();

	const [grade, setGrade] = useState<Grade>({
		//course: "",
        //student: "",
        session: 0,
        retake: 0
      });

    const addGrade = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
        try {
            console.log(grade);
            await axios.post(`${BACKEND_API_URL}grade/`, grade);
            navigate('/grade/');
        } catch (error) {
            alert("The introduced grade could not be added.")
			console.log(error);
		}
	};

	return (
        <Container>
            <h1 style={{paddingBottom: "25px", paddingTop: "60px"}}>
				Add Grade
			</h1>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: "10px"}}>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/grade/`}>
                    <ArrowBackIcon />
                </IconButton>{" "}
            </Box>
			<Card>
                <CardContent>
					<form onSubmit={addGrade}>
						<TextField
							id="course"
							label="Course"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							//onChange={(event) => setGrade({ ...grade, course: event.target.value })}
						/>
						<TextField
							id="student"
							label="Student"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							//onChange={(event) => setGrade({ ...grade, student: event.target.value })}
                        />
                        <TextField
							id="session"
							label="Session"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							type="number"
							InputProps={{
								inputProps: {
									min: 0,
									max: 10,
								}
							}}
							onChange={(event) => setGrade({ ...grade, session: parseFloat(event.target.value) })}
						/>
						<TextField
							id="retake"
							label="Retake"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							type="number"
							InputProps={{
								inputProps: {
									min: 0,
									max: 10,
								}
							}}
							onChange={(event) => setGrade({ ...grade, retake: parseFloat(event.target.value) })}
						/>
						
						<Button type="submit">Add Grade</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};
