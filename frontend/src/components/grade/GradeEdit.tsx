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

export const GradeEdit = () => {
    const navigate = useNavigate();
    const { gradeID } = useParams();

    const [grade, setGrade] = useState<Grade>({
		//course: "",
        //student: "",
        session: 0,
        retake: 0
      });
    
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
                    <TextField
							id="course"
							label="Course"
							variant="outlined"
                            fullWidth
                            value={grade.course_name}
							sx={{ mb: 2 }}
							//onChange={(event) => setGrade({ ...grade, name: event.target.value })}
						/>
						<TextField
							id="student"
							label="student"
							variant="outlined"
                            fullWidth
                            value={grade.student_fname + " " + grade.student_lname}
							sx={{ mb: 2 }}
							//nChange={(event) => setGrade({ ...grade, university: event.target.value })}
                        />
                        <TextField
							id="session"
							label="Session"
							variant="outlined"
                            fullWidth
                            value={grade.session}
							sx={{ mb: 2 }}
							onChange={(event) => setGrade({ ...grade, session: parseFloat(event.target.value) })}
						/>
						<TextField
							id="retake"
							label="Retake"
							variant="outlined"
                            fullWidth
                            value={grade.retake}
							sx={{ mb: 2 }}
							onChange={(event) => setGrade({ ...grade, retake: parseFloat(event.target.value) })}
						/>
						<Button type="submit">Edit Grade</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};
