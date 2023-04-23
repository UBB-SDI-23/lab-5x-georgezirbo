import { useEffect, useState } from "react";
import {
	Button,
    TextField
} from "@mui/material";
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
import { BarChart, Minimize} from "@mui/icons-material";
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const GradeFilter = () => {
	const [grades, setGrades] = useState<Grade[]>([]);
    const [loading, setLoading] = useState(false);
    const [MinFinal, setMinFinal] = useState(0);
  
	useEffect(() => {
	  setLoading(true);
	  fetch(`${BACKEND_API_URL}grade/`)
		.then((res) => res.json())
		.then((data) => {
			setGrades(data);
			setLoading(false);
		});
    }, []);
    
    const handleFilterClick = () => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}grade/?final-gte=${MinFinal}`)
          .then((res) => res.json())
          .then((data) => {
            setGrades(data);
            setLoading(false);
          });
      };
  
  
	const columns: GridColDef[] = [
		{
			field: "id", headerName: "#", width: 20,
			renderCell: (params) => (
				<Link to={`/grade/${params.row.gid}/details/`} title="View grade details">
					{params.value}
				</Link>
			),
		},
		{ field: "course", headerName: "Course", width: 200, align: 'center', headerAlign: 'center', },
		{ field: "student", headerName: "Student", width: 250, align: 'center', headerAlign: 'center', },
		{ field: "session", headerName: "Session", width: 100, align: 'center', headerAlign: 'center',  },
		{ field: "retake", headerName: "Retake", width: 100, align: 'center', headerAlign: 'center',  },
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
			<h1 style={{paddingBottom: "40px", paddingTop: "60px"}}>
				Filter Grade List
			</h1>
			{loading && <CircularProgress />}
			{!loading && grades.length === 0 && <p>No grades</p>}
            {!loading && (
                <Box display="flex" alignItems="left" justifyContent="left" mb={3}>
                    <IconButton component={Link} sx={{ mr: 25 }} to={`/grade/`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <TextField
                        label="Min Final Grade"
                        variant="outlined"
                        size="medium"
                        value={MinFinal}
                        onChange={(e) => setMinFinal(parseFloat(e.target.value))}
                        type="number"
                        inputProps={{ min: 0, max: 10 }}
                        sx={{ width: 150 }}
                    />
                    <Button variant="contained" startIcon={<FilterAltIcon/>} onClick={handleFilterClick} disabled={!MinFinal}>
                        Filter
                    </Button>
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