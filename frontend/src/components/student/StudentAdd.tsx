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
import {getUser} from "../utils";

export const StudentAdd = () => {
	const navigate = useNavigate();

    const [student, setStudent] = useState<Student>({
        fname: "",
        lname: "",
        cnp: "",
        email: "",
        phone: "",
		user: getUser()
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

    const addStudent = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
        try {
            console.log(student);
            const response = await axios.post(`${BACKEND_API_URL}student/`, student);
			const sid = response.data.sid;
            navigate(`/student/${sid}/details`);
        } catch (error) {
            alert("The introduced student could not be added.")
			console.log(error);
		}
	};

	return (
		<>
			<Container>
				<h1 style={{paddingBottom: "25px", paddingTop: "60px"}}>
					Add Student
				</h1>
				<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: "10px"}}>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/`}>
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
								error={validateFname && !isFnameValid}
								helperText={validateFname && !isFnameValid ? 'Invalid first name.':''}
								onFocus={() => setvalidateFname(true)}
							/>
							<TextField
								id="lname"
								label="Last Name"
								variant="outlined"
								fullWidth
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
								sx={{ mb: 2 }}
								onChange={(event) => { setStudent({ ...student, cnp: event.target.value });  setValidateCnp}}
								error={validateCnp && !isCnpValid}
								helperText={validateCnp && !isCnpValid ? 'Invalid CNP.' : ''}
								onFocus={() => setValidateCnp(true)}
							/>

							<TextField
								id="email"
								label="Email"
								variant="outlined"
								fullWidth
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
								sx={{ mb: 2 }}
								onChange={(event) => setStudent({ ...student, phone: event.target.value })}
								error={validatePhone && !isPhoneValid}
								helperText={validatePhone && !isPhoneValid ? 'Invalid phone number.' : ''}
								onFocus={() => setValidatePhone(true)}
							/>
							<Button type="submit" style={{ backgroundColor: "#808080", color: "#fff", width: "100%" }} disabled={!isFormValid}>Add Student</Button>
						</form>
					</CardContent>
					<CardActions></CardActions>
				</Card>
			</Container>
		</>
	);
};
