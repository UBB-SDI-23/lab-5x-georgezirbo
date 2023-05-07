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
import {Paginator} from "../Pagination"
        
export const CourseByNoStudents = () => {
	const [courses, setCourses] = useState<Course[]>([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);
    const [totalRows, setTotalRows] = useState(0);
    const crt = (page - 1) * pageSize + 1;
    const [isLastPage, setIsLastPage] = useState(false);

    const setCurrentPage = (newPage: number) => {
        setPage(newPage);
    }

    const goToNextPage = () => {
        if (isLastPage) {
            return;
        }

        setPage(page + 1);
    }

    const goToPrevPage = () => {
        if (page === 1) {
            return;
        }

        setPage(page - 1);
    }

    const fetchCourses = async () => {
        setLoading(true);
		const start = new Date().getTime()
        const response = await fetch(
          `${BACKEND_API_URL}course/by-no-students/?page=${page}&page_size=${pageSize}`
        );
		console.log(`GET COURSES BY NO STUDENTS: ${(new Date().getTime() - start)/1000} seconds`)
        const { count, next, previous, results } = await response.json();
        setCourses(results);
        setTotalRows(count);
        setIsLastPage(!next);
        setLoading(false);
      };
    
      useEffect(() => {
        fetchCourses();
      }, [page]);

  
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
		  teacher: course?.teacher_name,
		  students: course.no_students,
		  cid: course.cid, // add the cid field to use it in the operations renderer
		};
	  }); 

	
	return (
		<Container>
			<h1 style={{paddingBottom: "20px", paddingTop: "60px"}}>
				Courses By No Students
			</h1>
			{loading && <CircularProgress />}
			{!loading && courses.length === 0 && <p>No courses found</p>}
			{!loading && courses.length > 0 && (
				<Container style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', }}>
					<Box sx={{paddingBottom: "10px"}}>
						<IconButton component={Link} sx={{ mr: 3 }} to={`/course/`}>
							<ArrowBackIcon />
						</IconButton>{" "}
					</Box>
					<DataGrid
					columns={columns}
					rows={rows}
					autoHeight
					hideFooter={true}
					/>
					<Paginator
                        rowsPerPage={pageSize}
                        totalRows={totalRows}
                        currentPage={page}
                        setPage={setCurrentPage}
                    />
				</Container>
			)}
		</Container>
	  );
	  
	  
  };