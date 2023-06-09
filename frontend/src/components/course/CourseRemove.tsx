import { Container, Card, CardContent, IconButton, CardActions, Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../../constants";
import {getAccessToken} from "../utils";

export const CourseRemove = () => {
	const { courseID } = useParams();
	const navigate = useNavigate();

	const handleDelete = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
        try {
            await axios.delete(`${BACKEND_API_URL}course/${courseID}/`, {
				headers: {
					Authorization: `Bearer ${getAccessToken()}`,
				},
			});
            navigate('/course/');
        } catch (error) {
            console.log(error);
            alert('An error occurred while deleting the course.');
        }
	};

	const handleCancel = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		navigate("/course/");
	};

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/course`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					Are you sure you want to delete this course?
				</CardContent>
				<CardActions>
                    <Button sx={{color: "red"}}
                        onClick={ handleDelete } > Delete it</Button>
					<Button onClick={handleCancel}>Cancel</Button>
				</CardActions>
			</Card>
		</Container>
	);
};
