import { useEffect, useState } from "react";
import { Student } from "../../models/Student";
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

export const StudentAll = () => {
	const [students, setStudents] = useState<Student[]>([]);
	const [loading, setLoading] = useState(false);
  
	useEffect(() => {
	  setLoading(true);
	  fetch(`${BACKEND_API_URL}student/`)
		.then((res) => res.json())
		.then((data) => {
			setStudents(data);
			setLoading(false);
		});
	}, []);
  
	if (!loading && students.length === 0) {
	  return <div>No students</div>;
	}
  
	const columns: GridColDef[] = [
		{ field: "id", headerName: "#", width: 70 },
		{ field: "fname", headerName: "First name", width: 150,
			renderCell: (params) => (
				<Link to={`/student/${params.row.sid}/details/`} title="View student details">
					{params.value}
				</Link>
			),
		},
		{ field: "lname", headerName: "Last name", width: 150,
			renderCell: (params) => (
				<Link to={`/student/${params.row.sid}/details/`} title="View student details">
					{params.value}
				</Link>
			),
		},
		{ field: "cnp", headerName: "CNP", width: 150 },
		{ field: "email", headerName: "Email", width: 200 },
		{ field: "phone", headerName: "Phone", width: 150 },
		{
		  field: "operations",
		  headerName: "Operations",
		  width: 150,
		  renderCell: (params) => (
			<Container>
				<IconButton component={Link} sx={{ mr: 3 }} to={`/student/${params.row.sid}/edit/`}>
					<Tooltip title="Edit student" arrow>
					<EditIcon color="primary" />
					</Tooltip>
				</IconButton>
	  
				<IconButton component={Link} sx={{ mr: 3 }} to={`/student/${params.row.sid}/remove/`}>
					<Tooltip title="Delete student" arrow>
					<DeleteForeverIcon sx={{ color: "red" }} />
					</Tooltip>
			  </IconButton>
			</Container>
		  ),
		},
	  ];
	  
	  const rows = students.map((student, index) => {
		return {
		  id: index + 1,
		  fname: student.fname,
		  lname: student.lname,
		  cnp: student.cnp,
		  email: student.email,
		  phone: student.phone,
		  sid: student.sid, // add the sid field to use it in the operations renderer
		};
	  });

	
	return (
		<Container>
			<h1 style={{paddingBottom: "20px", paddingTop: "60px"}}>
				Student List
			</h1>
			{loading && <CircularProgress />}
			{!loading && students.length === 0 && <p>No students found</p>}
			{!loading && (
				<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: "10px"}}>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/student/add/`}>
						<Tooltip title="Add a new student" arrow>
							<AddIcon sx={{color: "green"}} />
						</Tooltip>
					</IconButton>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/student/by-average/`}>
						<Tooltip title="Sort By Average Grade" arrow>
							<BarChart sx={{ color: "purple" }} />
						</Tooltip>
					</IconButton>
			  </Box>
			)}
			{!loading && students.length > 0 && (
				<Container>
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