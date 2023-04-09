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
import { Student } from "../../models/Student";
import { BACKEND_API_URL } from "../../../constants";

export const StudentAdd = () => {
	const navigate = useNavigate();

    const [student, setStudent] = useState<Student>({
        fname: "",
        lname: "",
        cnp: "",
        email: "",
        phone: "",
      });

    const addStudent = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
        try {
            console.log(student);
            await axios.post(`${BACKEND_API_URL}student/`, student);
            navigate('/student/');
        } catch (error) {
            alert("The introduced student could not be added.")
			console.log(error);
		}
	};

	return (
        <Container>
            <h1 style={{paddingBottom: "25px", paddingTop: "60px"}}>
				Add Student
			</h1>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: "10px"}}>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/student/`}>
                    <ArrowBackIcon />
                </IconButton>{" "}
            </Box>
			<Card>
                <CardContent>
					<form onSubmit={addStudent}>
						<TextField
							id="fname"
							label="First Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setStudent({ ...student, fname: event.target.value })}
						/>
						<TextField
							id="lname"
							label="Last Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setStudent({ ...student, lname: event.target.value })}
                        />
                        <TextField
							id="cnp"
							label="CNP"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setStudent({ ...student, cnp: event.target.value })}
                        />
                        <TextField
							id="email"
							label="Email"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setStudent({ ...student, email: event.target.value })}
                        />
                        <TextField
							id="phone"
							label="Phone"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setStudent({ ...student, phone: event.target.value })}
						/>
						<Button type="submit">Add Student</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};
