import { useEffect, useState } from "react";
import { Grade } from "../../models/Grade";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CircularProgress, IconButton, Tooltip, Box} from "@mui/material";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import { BACKEND_API_URL } from "../../../constants";
import { BarChart } from "@mui/icons-material";

export const GradeAll = () => {
	const [grades, setGrades] = useState<Grade[]>([]);
	const [loading, setLoading] = useState(false);
  
	useEffect(() => {
	  setLoading(true);
	  fetch(`${BACKEND_API_URL}grade/`)
		.then((res) => res.json())
		.then((data) => {
			setGrades(data);
			setLoading(false);
		});
	}, []);
  
	if (!loading && grades.length === 0) {
	  return <div>No grades</div>;
	}
  
	const columns: GridColDef[] = [
		{
			field: "id", headerName: "#", width: 20,
			renderCell: (params) => (
				<Link to={`/grade/${params.row.gid}/details/`} title="View grade details">
					{params.value}
				</Link>
			),
		},
		{ field: "course", headerName: "Course", width: 200,},
		{ field: "student", headerName: "Student", width: 250},
		{ field: "session", headerName: "Session", width: 100 },
		{ field: "retake", headerName: "Retake", width: 100,  },
		{
		  field: "operations",
		  headerName: "Operations",
		  width: 150,
		  align: 'center', headerAlign: 'center',
		  renderCell: (params) => (
			<Container>
				<IconButton component={Link} sx={{ ml: 3,mr: 3 }} to={`/grade/${params.row.gid}/edit/`}>
					<Tooltip title="Edit grade" arrow>
					<EditIcon color="primary" />
					</Tooltip>
				</IconButton>
	  
				<IconButton component={Link} sx={{ mr: 3 }} to={`/grade/${params.row.gid}/remove/`}>
					<Tooltip title="Delete grade" arrow>
					<DeleteForeverIcon sx={{ color: "red" }} />
					</Tooltip>
				</IconButton>
			</Container>
		  ),
		},
	  ];
	  
	  const rows = grades.map((grade, index) => {
		return {
		  id: index + 1,
		  course: grade.course_name,
		  student: grade.student_fname + " " + grade.student_lname,
		  session: grade.session,
		  retake: grade.retake,
		  gid: grade.gid, // add the gid field to use it in the operations renderer
		};
	  }); 

	
	return (
		<Container>
			<h1 style={{paddingBottom: "20px", paddingTop: "60px"}}>
				Grade List
			</h1>
			{loading && <CircularProgress />}
			{!loading && grades.length === 0 && <p>No grades found</p>}
			{!loading && (
				<Box sx={{display: 'flex', justifyContent: 'flex-start', paddingBottom: "10px"}}>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/grade/add/`}>
						<Tooltip title="Add a new grade" arrow>
							<AddIcon sx={{color: "green"}} />
						</Tooltip>
					</IconButton>
			  </Box>
			)}
			{!loading && grades.length > 0 && (
				<Container style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap',}}>
					<DataGrid
					columns={columns}
					rows={rows}
					autoHeight
					/>
				</Container>
			)}
		</Container>
	  );
	  
	  
  };