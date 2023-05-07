import {
    Card,
    CardActions,
    CardContent,
    IconButton,
    Box,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell, TableBody, TableContainer
} from "@mui/material";
import { Container } from "@mui/system";
import {MouseEventHandler, useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import { Teacher } from "../../models/Teacher";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../../constants";
import { Tooltip } from "react-bootstrap";
import { List, ListItem, ListItemText, Grid } from "@mui/material";

export const TeacherDetails = () => {
	const { teacherID } = useParams();
    const [teacher, setTeacher] = useState<Teacher>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [expanded, toggleExpanded] = useState(false);

	useEffect(() => {
        const fetchTeacher = async () => {
          setLoading(true);
          try {
              const response = await fetch(`${BACKEND_API_URL}teacher/${teacherID}/`);
              console.log(response);
            const data = await response.json();
            setTeacher(data);
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        };
        fetchTeacher();
    }, [teacherID]);
    
    const getValue: {[key: string]: string} = {
        "P": "Professor",
        "L": "Lecturer",
        "A": "Associate"
      };

    function handleClick(): MouseEventHandler<HTMLButtonElement> {
        return (event) => {
            toggleExpanded(!expanded);
        };
    }

    return (
        <Container style={{paddingTop: 100}}>
            <h1>
			    Teacher Details
			</h1>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: "10px"}}>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/teacher/`}>
                    <ArrowBackIcon />
                </IconButton>{" "}
            </Box>
			<Card>
                <CardContent>
                    <p><b>First Name</b>: {teacher?.fname}</p>
                    <p><b>Last Name</b>: {teacher?.lname}</p>
                    <p><b>Rank</b>: {teacher ? getValue[teacher.rank] : ""}</p>
                    <div style={{ maxWidth: 500 }}>
                        <p style={{ maxHeight: expanded ? 'none' : 100, overflow: 'hidden' }}>
                            <b>Description</b>: {teacher?.descr ?? 'N/A'}
                        </p>
                        {teacher && teacher?.descr?.length > 100 && (
                            <button style={{width: 75, textAlign: "center", border: "none", background: "none", outline: "none"}} onClick={handleClick()}>
                                <p style={{fontSize: 16, margin:0, color: "blue", textDecoration: expanded ? "underline":""}}>{expanded ? 'less' : '...'}</p>
                            </button>
                        )}
                    </div>
                    <p style={{ marginBottom: 0, fontWeight: 'bold'}}>Courses: </p>
                    {teacher?.courses && teacher.courses.length > 0 &&
                    <TableContainer style={{ maxHeight: 325 , marginTop: 15}}>
                        <Table style={{ border: '1px solid gray' }}>
                            <TableHead sx={{ bgcolor: 'grey.400'}}>
                                <TableRow>
                                    <TableCell align={"center"}>Course</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {teacher?.courses?.map((course) => (
                                    <TableRow key={course.cid}>
                                        <TableCell align={"center"}>{course.name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    }
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<CardActions>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/teacher/${teacherID}/edit/`}>
                        <Tooltip title="Edit teacher">
                        <EditIcon color="primary" />
                        </Tooltip>
                    </IconButton>
        
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/teacher/${teacherID}/remove/`}>
                        <Tooltip title="Delete teacher">
                        <DeleteForeverIcon sx={{ color: "red" }} />
                        </Tooltip>
                </IconButton>
                </CardActions>
                </Box>
			</Card>
		</Container>
	);
};
