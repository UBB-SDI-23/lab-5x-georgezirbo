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
import { BACKEND_API_URL } from "../../../constants";
import { BarChart } from "@mui/icons-material";
import {Paginator} from "../Pagination"

export const CourseAll = () => {
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
          `${BACKEND_API_URL}course/?page=${page}&page_size=${pageSize}`
        );
		console.log(`GET COURSES: ${(new Date().getTime() - start)/1000} seconds`)
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
		{ field: "teacher", headerName: "Teacher", width: 200, align: 'center', headerAlign: 'center',
			renderCell: (params) => (
				<Link to={`/teacher/${courses[params.row.id-1]?.teacher}/details/`} title="View teacher details">
					{params.value}
				</Link>
			),
		},
		{ field: "students", headerName: "# of students", width: 100, align: 'center', headerAlign: 'center', },
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
		<Container style={{flexDirection: 'column'}}>
			<h1 style={{paddingBottom: "20px", paddingTop: "60px"}}>
				Course List
			</h1>
			{loading && <CircularProgress />}
			{!loading && courses.length === 0 && <p>No courses found</p>}
			{!loading && (
				<Box sx={{paddingBottom: "10px"}}>
				<IconButton component={Link} sx={{ mr: 3 }} to={`/course/add/`}>
					<Tooltip title="Add a new course" arrow>
						<AddIcon sx={{color: "green"}} />
					</Tooltip>
				</IconButton>
				<IconButton component={Link} sx={{ mr: 3 }} to={`/course/by-no-students/`}>
					<Tooltip title="Sort By No Students" arrow>
						<BarChart sx={{ color: "purple" }} />
					</Tooltip>
				</IconButton>
			</Box>
			)}
			{!loading && courses.length > 0 && (
				<Container style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
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