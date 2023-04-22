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
import { Student } from "../../models/Student";

export const StudentEdit = () => {
    const navigate = useNavigate();
    const { studentID } = useParams();

    const [student, setStudent] = useState<Student>({
        fname: "",
        lname: "",
        cnp: "",
        email: "",
        phone: "",
    });
    
    useEffect(() => {
        const fetchStudent =async () => {
            try{
                const response = await fetch(`${BACKEND_API_URL}student/${studentID}/`);
                const student = await response.json();
                setStudent(student);
            } catch (error) {
                console.log(error);
                alert(error);
            }
        };
        fetchStudent();
    }, []);


    const editStudent = async (event: { preventDefault: () => void}) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}student/${studentID}/`, student);
            navigate(`/student/${studentID}/details/`);
        }catch(error){
            console.log(error);
            alert(error);
        }
    };

	return (
        <Container>
            <h1 style={{paddingBottom: "25px"}}>
				Edit Student
			</h1>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: "10px"}}>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/student/`}>
                    <ArrowBackIcon />
                </IconButton>{" "}
            </Box>
			<Card>
                <CardContent>
					<form onSubmit={editStudent}>
						<TextField
							id="fname"
							label="First Name"
							variant="outlined"
                            fullWidth
                            value={student.fname}
							sx={{ mb: 2 }}
							onChange={(event) => setStudent({ ...student, fname: event.target.value })}
						/>
						<TextField
							id="lname"
							label="Last Name"
							variant="outlined"
                            fullWidth
                            value={student.lname}
							sx={{ mb: 2 }}
							onChange={(event) => setStudent({ ...student, lname: event.target.value })}
                        />
                        <TextField
							id="cnp"
							label="CNP"
							variant="outlined"
                            fullWidth
                            value={student.cnp}
							sx={{ mb: 2 }}
							onChange={(event) => setStudent({ ...student, cnp: event.target.value })}
                        />
                        <TextField
							id="email"
							label="Email"
							variant="outlined"
                            fullWidth
                            value={student.email}
							sx={{ mb: 2 }}
							onChange={(event) => setStudent({ ...student, email: event.target.value })}
                        />
                        <TextField
							id="phone"
							label="Phone"
							variant="outlined"
                            fullWidth
                            value={student.phone}
							sx={{ mb: 2 }}
							onChange={(event) => setStudent({ ...student, phone: event.target.value })}
						/>
						<Button type="submit">Edit Student</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};
