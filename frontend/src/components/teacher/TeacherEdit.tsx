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
        rank: ""
    });

    const getKey: {[key: string]: string} = {
        "Professor": "P",
        "Lecturer": "L",
        "Associate": "A"
    };
    const getValue: {[key: string]: string} = {
        "P": "Professor",
        "L": "Lecturer",
        "A": "Associate"
    };
    
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
						/>
						<TextField
                            id="lname"
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            value={teacher.lname}
                            sx={{ mb: 2 }}
                            onChange={(event) => setTeacher({ ...teacher, lname: event.target.value })}
                        />

                        <TextField
                            id="rank"
                            label="Rank"
                            variant="outlined"
                            fullWidth
                            select
                            value={teacher.rank}
                            sx={{ mb: 2 }}
                            onChange={(event) => setTeacher({ ...teacher, rank: event.target.value})}
                        >
                            {Object.keys(getValue).map((key) => (
                                <MenuItem key={key} value={key}>
                                    <Typography sx={{ textAlign: 'left' }}>
                                        {getValue[key]}
                                    </Typography>
                                </MenuItem>
                            ))}

                        </TextField>

						<Button type="submit">Edit Teacher</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};
