import { Card, CardActions, CardContent, IconButton, Box } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Grade } from "../../models/Grade";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../../constants";
import { Tooltip } from "react-bootstrap";
import { List, ListItem, ListItemText, Grid } from "@mui/material";

export const GradeDetails = () => {
	const { gradeID } = useParams();
    const [grade, setGrade] = useState<Grade>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

	useEffect(() => {
        const fetchGrade = async () => {
          setLoading(true);
          try {
              const response = await fetch(`${BACKEND_API_URL}grade/${gradeID}/`);
              console.log(response);
            const data = await response.json();
            setGrade(data);
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        };
        fetchGrade();
      }, [gradeID]);

	return (
        <Container>
            <h1 style={{paddingBottom: "25px"}}>
			    Grade Details
			</h1>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: "10px"}}>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/grade/`}>
                    <ArrowBackIcon />
                </IconButton>{" "}
            </Box>
			<Card>
                <CardContent>
                    <p>Course: {grade?.course_name}</p>
                    <p>Student: {grade?.student_fname + " " + grade?.student_lname}</p>
                    <p>Session: {grade?.session}</p>
                    <p>Retake: {grade?.retake}</p>
            </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<CardActions>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/grade/${gradeID}/edit/`}>
                        <Tooltip title="Edit grade">
                        <EditIcon color="primary" />
                        </Tooltip>
                    </IconButton>
        
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/grade/${gradeID}/remove/`}>
                        <Tooltip title="Delete grade">
                        <DeleteForeverIcon sx={{ color: "red" }} />
                        </Tooltip>
                </IconButton>
                </CardActions>
                </Box>
			</Card>
		</Container>
	);
};
