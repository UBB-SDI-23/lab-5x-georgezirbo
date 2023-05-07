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
import {Paginator} from "../Pagination"

export const TeacherAll = () => {
	const [teachers, setTeachers] = useState<Teacher[]>([]);
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

    const fetchTeachers = async () => {
        setLoading(true);
		const start = new Date().getTime()
        const response = await fetch(
          `${BACKEND_API_URL}teacher/?page=${page}&page_size=${pageSize}`
        );
		console.log(`GET TEACHERS: ${(new Date().getTime() - start)/1000} seconds`)
        const { count, next, previous, results } = await response.json();
        setTeachers(results);
        setTotalRows(count);
        setIsLastPage(!next);
        setLoading(false);
      };
    
      useEffect(() => {
        fetchTeachers();
      }, [page]);



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
		{ field: "rank", headerName: "Rank", width: 120, align: 'center', headerAlign: 'center' },	
		{ field: "courses", headerName: "# of courses", width: 100, align: 'center', headerAlign: 'center', },
		{ field: "descr", headerName: "Description", width: 200, align: 'center', headerAlign: 'center', },
		{
			field: "operations",
			headerName: "Operations",
			width: 150,
			align: 'center', headerAlign: 'center',
			renderCell: (params) => (
			  <Container>
				  <IconButton component={Link} sx={{ ml: 3,mr: 3 }} to={`/teacher/${params.row.tid}/edit/`}>
					  <Tooltip title="Edit teacher" arrow>
					  <EditIcon color="primary" />
					  </Tooltip>
				  </IconButton>
		
				  <IconButton component={Link} sx={{ mr: 3 }} to={`/teacher/${params.row.tid}/remove/`}>
					  <Tooltip title="Delete teacher" arrow>
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
	  
	  const rows = teachers.map((teacher, index) => {
		return {
		  id: index + 1,
		  fname: teacher.fname,
		  lname: teacher.lname,
		  rank: getValue[teacher.rank],
		  descr: teacher.descr,
		  courses: teacher.no_courses,
		  tid: teacher.tid, // add the tid field to use it in the operations renderer
		};
	  });

	
	return (
		<Container style={{flexDirection: 'column', width: totalWidth}}>
			<h1 style={{paddingBottom: "20px", paddingTop: "60px"}}>
				Teacher List
			</h1>
			{loading && <CircularProgress />}
			{!loading && teachers.length === 0 && <p>No teachers found</p>}
			{!loading && (
				<Box sx={{paddingBottom: "10px"}}>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/teacher/add/`}>
						<Tooltip title="Add a new teacher" arrow>
							<AddIcon sx={{color: "green"}} />
						</Tooltip>
					</IconButton>
			  </Box>
			)}
			{!loading && teachers.length > 0 && (
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