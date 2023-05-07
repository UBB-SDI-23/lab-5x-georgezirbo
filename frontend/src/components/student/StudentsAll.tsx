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
import {Paginator} from "../Pagination";

export const StudentAll = () => {
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
		const start=new Date().getTime()
		const response = await fetch(
			`${BACKEND_API_URL}student/?page=${page}&page_size=${pageSize}`
		);
		console.log(`GET STUDENTS: ${(new Date().getTime() - start)/1000} seconds`)
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
		{ field: "id", headerName: "#", width: 20 },
		{ field: "fname", headerName: "First name", width: 100, align: 'center', headerAlign: 'center',
			renderCell: (params) => (
				<Link to={`/student/${params.row.sid}/details/`} title="View student details">
					{params.value}
				</Link>
			),
		},
		{ field: "lname", headerName: "Last name", width: 100, align: 'center', headerAlign: 'center',
			renderCell: (params) => (
				<Link to={`/student/${params.row.sid}/details/`} title="View student details">
					{params.value}
				</Link>
			),
		},
		{ field: "cnp", headerName: "CNP", width: 200, align: 'center', headerAlign: 'center', },
		{ field: "email", headerName: "Email", width: 250, align: 'center', headerAlign: 'center', },
		{ field: "phone", headerName: "Phone", width: 150, align: 'center', headerAlign: 'center', },
		{ field: "courses", headerName: "# of courses", width: 100, align: 'center', headerAlign: 'center', },
		{
			field: "operations",
			headerName: "Operations",
			width: 150,
			align: 'center', headerAlign: 'center',
			renderCell: (params) => (
				<Container>
					<IconButton component={Link} sx={{ ml: 3,mr: 3 }} to={`/student/${params.row.sid}/edit/`}>
						<Tooltip title="Edit course" arrow>
							<EditIcon color="primary" />
						</Tooltip>
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/student/${params.row.sid}/remove/`}>
						<Tooltip title="Delete course" arrow>
							<DeleteForeverIcon sx={{ color: "red" }} />
						</Tooltip>
					</IconButton>
				</Container>
			),
		},
	];

	let totalWidth = 0;
	columns.forEach((column) => {
		if (column.width) {
			totalWidth += column.width;
		}
	});

	const rows = students.map((student, index) => {
		return {
			id: index + 1,
			fname: student.fname,
			lname: student.lname,
			cnp: student.cnp,
			email: student.email,
			phone: student.phone,
			courses: student.no_courses,
			sid: student.sid, // add the sid field to use it in the operations renderer
		};
	});


	return (
		<Container style={{flexDirection: 'column', width: totalWidth}}>
			<h1 style={{paddingBottom: "20px", paddingTop: "60px"}}>
				Student List
			</h1>
			{loading && <CircularProgress />}
			{!loading && students.length === 0 && <p>No students found</p>}
			{!loading && (
				<Box sx={{paddingBottom: "10px"}}>
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
				<Container style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap',}}>
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