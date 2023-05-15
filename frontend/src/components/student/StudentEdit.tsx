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
import {getAccessToken} from "../utils";

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

    const isFnameValid = student.fname != "";
	const isLnameValid = student.lname != "";
	const isCnpValid = student.cnp.match(/^[1256][0-9]{2}[0-1][0-9][0-3][0-9]\d{6}$/);
	const isEmailValid = student.email.match(/[a-z]{2,10}\.[a-z]{2,10}@stud\.com/);
	const isPhoneValid = student.phone.match(/07\d{8}/);
	const [validateLname, setvalidateLname] = useState(false);
	const [validateCnp, setValidateCnp] = useState(false);
	const [validateFname, setvalidateFname] = useState(false);
	const [validateEmail, setValidateEmail] = useState(false);
	const [validatePhone, setValidatePhone] = useState(false);
	const isFormValid = isFnameValid && isLnameValid && isCnpValid && isEmailValid && isPhoneValid;
    
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
            await axios.put(`${BACKEND_API_URL}student/${studentID}/`, student, {
				headers: {
					Authorization: `Bearer ${getAccessToken()}`,
				},
			});
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
                            error={validateFname && !isFnameValid}
							helperText={validateFname && !isFnameValid ? 'Invalid first name.':''}
							onFocus={() => setvalidateFname(true)}
						/>
						<TextField
							id="lname"
							label="Last Name"
							variant="outlined"
                            fullWidth
                            value={student.lname}
							sx={{ mb: 2 }}
                            onChange={(event) => setStudent({ ...student, lname: event.target.value })}
                            error={validateLname && !isLnameValid}
							helperText={validateLname && !isLnameValid ? 'Invalid last name.':''}
							onFocus={() => setvalidateLname(true)}
                        />
                        <TextField
							id="cnp"
							label="CNP"
							variant="outlined"
                            fullWidth
                            value={student.cnp}
							sx={{ mb: 2 }}
                            onChange={(event) => setStudent({ ...student, cnp: event.target.value })}
                            error={validateCnp && !isCnpValid}
							helperText={validateCnp && !isCnpValid ? 'Invalid CNP.' : ''}
							onFocus={() => setValidateCnp(true)}
                        />
                        <TextField
							id="email"
							label="Email"
							variant="outlined"
                            fullWidth
                            value={student.email}
							sx={{ mb: 2 }}
                            onChange={(event) => setStudent({ ...student, email: event.target.value })}
                            error={validateEmail && !isEmailValid}
							helperText={validateEmail && !isEmailValid ? 'Invalid email.':''}
							onFocus={() => setValidateEmail(true)}
                        />
                        <TextField
							id="phone"
							label="Phone"
							variant="outlined"
                            fullWidth
                            value={student.phone}
							sx={{ mb: 2 }}
                            onChange={(event) => setStudent({ ...student, phone: event.target.value })}
                            error={validatePhone && !isPhoneValid}
							helperText={validatePhone && !isPhoneValid ? 'Invalid phone number.' : ''}
							onFocus={() => setValidatePhone(true)}
						/>
						<Button type="submit" style={{backgroundColor: "#808080", color: "#fff", width: "100%"}} disabled={!isFormValid
						}>Edit Student</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};
