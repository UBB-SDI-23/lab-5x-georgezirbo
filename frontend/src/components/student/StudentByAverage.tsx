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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BACKEND_API_URL } from "../../../constants";
import { BarChart } from "@mui/icons-material";
import {Paginator} from "../Pagination"
        
export const StudentByAverage = () => {
	const [students, setStudents] = useState<Student[]>([]);
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

    const fetchStudents = async () => {
        setLoading(true);
		const start = new Date().getTime();
        const response = await fetch(
          `${BACKEND_API_URL}student/by-average/?page=${page}&page_size=${pageSize}`
        );
		console.log(`GET STUDENTS BY AVERAGE: ${(new Date().getTime() - start)/1000} seconds`)
        const { count, next, previous, results } = await response.json();
        setStudents(results);
        setTotalRows(count);
        setIsLastPage(!next);
        setLoading(false);
      };
    
      useEffect(() => {
        fetchStudents();
      }, [page]);
  
	if (!loading && students.length === 0) {
	  return <div>No students</div>;
	}
  
	const columns: GridColDef[] = [
		{ field: "id", headerName: "#", width: 70 },
		{ field: "fname", headerName: "First name", width: 150 , align: 'center', headerAlign: 'center', 
			renderCell: (params) => (
				<Link to={`/student/${params.row.sid}/details/`} title="View student details">
					{params.value}
				</Link>
			),
		},
		{ field: "lname", headerName: "Last name", width: 150, align: 'center', headerAlign: 'center', 
			renderCell: (params) => (
				<Link to={`/student/${params.row.sid}/details/`} title="View student details">
					{params.value}
				</Link>
			),
		},
		{ field: "cnp", headerName: "CNP", width: 150, align: 'center', headerAlign: 'center',  },
		{ field: "email", headerName: "Email", width: 200, align: 'center', headerAlign: 'center',  },
        { field: "phone", headerName: "Phone", width: 150, align: 'center', headerAlign: 'center',  },
        { field: "avg_grade", headerName: "Average", width: 150, align: 'center', headerAlign: 'center', },
	  ];
	  
	  const rows = students.map((student, index) => {
		return {
		  id: index + 1,
		  fname: student.fname,
		  lname: student.lname,
		  cnp: student.cnp,
		  email: student.email,
          phone: student.phone,
          avg_grade: student.avg_grade,
		  sid: student.sid, 
		};
	  });

	
	return (
		<Container>
			<h1 style={{paddingBottom: "25px", paddingTop: "60px"}}>
				Students By Average
			</h1>
			{loading && <CircularProgress />}
			{!loading && students.length === 0 && <p>No students found</p>}
            {!loading && students.length > 0 && (
				<Container>
					<Box sx={{paddingBottom: "10px"}}>
						<IconButton component={Link} sx={{ mr: 3 }} to={`/student/`}>
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