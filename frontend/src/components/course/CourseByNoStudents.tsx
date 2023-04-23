import { useEffect, useState } from "react";
import { Course } from "../../models/Course";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CircularProgress, IconButton, Tooltip, Box} from "@mui/material";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BACKEND_API_URL } from "../../../constants";
        
export const CourseByNoStudents = () => {
	const [courses, setCourses] = useState<Course[]>([]);
	const [loading, setLoading] = useState(false);
  
	useEffect(() => {
	  setLoading(true);
	  fetch(`${BACKEND_API_URL}course/by-no-students/`)
		.then((res) => res.json())
		.then((data) => {
			setCourses(data);
			setLoading(false);
		});
	}, []);
  
	if (!loading && courses.length === 0) {
	  return <div>No courses</div>;
	}
  
	const columns: GridColDef[] = [
		{ field: "id", headerName: "#", width: 20 },
		{ field: "name", headerName: "Name", width: 200,
			renderCell: (params) => (
				<Link to={`/course/${params.row.cid}/details/`} title="View course details">
					{params.value}
				</Link>
			),
		},
		{ field: "university", headerName: "University", width: 250},
		{ field: "faculty", headerName: "Faculty", width: 250 },
		{ field: "department", headerName: "Department", width: 200,  },
		{ field: "year", headerName: "Year", width: 100, align: 'center', headerAlign: 'center', },
		{ field: "teacher", headerName: "Teacher", width: 200, align: 'center', headerAlign: 'center' },
		{ field: "students", headerName: "# of students", width: 100, align: 'center', headerAlign: 'center', },
	  ];
	  
	  const rows = courses.map((course, index) => {
		return {
		  id: index + 1,
		  name: course.name,
		  university: course.university,
		  faculty: course.faculty,
		  department: course.department,
		  year: course.year,
		  teacher: course?.teacher_fname + " " + course?.teacher_lname,
		  students: course.no_students,
		  cid: course.cid, // add the cid field to use it in the operations renderer
		};
	  }); 

	
	return (
		<Container style={{width:"1300px"}}>
			<h1 style={{paddingBottom: "20px", paddingTop: "60px"}}>
				Courses By No Students
			</h1>
			{loading && <CircularProgress />}
			{!loading && courses.length === 0 && <p>No courses found</p>}
			{!loading && courses.length > 0 && (
				<Container style={{ display: 'flex', justifyContent: 'left', flexWrap: 'wrap', }}>
					<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: "10px"}}>
						<IconButton component={Link} sx={{ mr: 3 }} to={`/course/`}>
							<ArrowBackIcon />
						</IconButton>{" "}
					</Box>
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