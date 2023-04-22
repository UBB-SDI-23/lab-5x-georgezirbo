import { useEffect, useState } from "react";
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
import { Teacher } from "../../models/Teacher";

export const TeacherAll = () => {
	const [teachers, setTeachers] = useState<Teacher[]>([]);
	const [loading, setLoading] = useState(false);
  
	useEffect(() => {
	  setLoading(true);
	  fetch(`${BACKEND_API_URL}teacher/`)
		.then((res) => res.json())
		.then((data) => {
			setTeachers(data);
			setLoading(false);
		});
	}, []);

	const getValue: {[key: string]: string} = {
        "P": "Professor",
        "L": "Lecturer",
        "A": "Associate"
    };
  
	if (!loading && teachers.length === 0) {
	  return <div>No teachers</div>;
	}
  
	const columns: GridColDef[] = [
		{ field: "id", headerName: "#", width: 20, align: 'center', headerAlign: 'center', },
		{ field: "fname", headerName: "First name", width: 100,
			renderCell: (params) => (
				<Link to={`/teacher/${params.row.tid}/details/`} title="View teacher details">
					{params.value}
				</Link>
			),
		},
		{ field: "lname", headerName: "Last name", width: 100, align: 'center', headerAlign: 'center',
			renderCell: (params) => (
				<Link to={`/teacher/${params.row.tid}/details/`} title="View teacher details">
					{params.value}
				</Link>
			),
		},
		{ field: "rank", headerName: "Rank", width: 120, align: 'center', headerAlign: 'center',
			renderCell: (params) => {
				return getValue[params.value];
			}
		},	
		{
			field: "operations",
			headerName: "Operations",
			width: 150,
			align: 'center', headerAlign: 'center',
			renderCell: (params) => (
			  <Container>
				  <IconButton component={Link} sx={{ ml: 3,mr: 3 }} to={`/course/${params.row.cid}/edit/`}>
					  <Tooltip title="Edit course" arrow>
					  <EditIcon color="primary" />
					  </Tooltip>
				  </IconButton>
		
				  <IconButton component={Link} sx={{ mr: 3 }} to={`/course/${params.row.cid}/remove/`}>
					  <Tooltip title="Delete course" arrow>
					  <DeleteForeverIcon sx={{ color: "red" }} />
					  </Tooltip>
				  </IconButton>
			  </Container>
			),
		  },
	  ];
	  
	  const rows = teachers.map((teacher, index) => {
		return {
		  id: index + 1,
		  fname: teacher.fname,
		  lname: teacher.lname,
		  rank: teacher.rank,
		  tid: teacher.tid, // add the tid field to use it in the operations renderer
		};
	  });

	
	return (
		<Container>
			<h1 style={{paddingBottom: "20px", paddingTop: "60px"}}>
				Teacher List
			</h1>
			{loading && <CircularProgress />}
			{!loading && teachers.length === 0 && <p>No teachers found</p>}
			{!loading && (
				<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: "10px"}}>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/teacher/add/`}>
						<Tooltip title="Add a new teacher" arrow>
							<AddIcon sx={{color: "green"}} />
						</Tooltip>
					</IconButton>
			  </Box>
			)}
			{!loading && teachers.length > 0 && (
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