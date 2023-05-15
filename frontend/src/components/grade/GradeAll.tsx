import React, { useEffect, useState } from "react";
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
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import {Paginator} from "../Pagination"
import {getUser, getUsername, isModerator, isUser} from "../utils";
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";

export const GradeAll = () => {
	const [grades, setGrades] = useState<Grade[]>([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);
    const [totalRows, setTotalRows] = useState(0);
    const crt = (page - 1) * pageSize + 1;
    const [isLastPage, setIsLastPage] = useState(false);

    const setCurrentPage = (newPage: number) => {
        setPage(newPage);
    }

    const fetchGrades = async () => {
		setLoading(true);
		const config = await axios.get(`${BACKEND_API_URL}settings/pagesize/`);
		const DefaultPageSize = parseInt(config.data.size);
		setPageSize(DefaultPageSize);
		const start = new Date().getTime()
        const response = await fetch(
          `${BACKEND_API_URL}grade/?page=${page}&page_size=${DefaultPageSize}`
        );
		console.log(`GET GRADES: ${(new Date().getTime() - start)/1000} seconds`)
        const { count, next, previous, results } = await response.json();
        setGrades(results);
        setTotalRows(count);
        setIsLastPage(!next);
        setLoading(false);
      };
    
  useEffect(() => {
	fetchGrades();
  }, [page]);

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
		{ field: "course", headerName: "Course", width: 200, align: 'center', headerAlign: 'center',
			renderCell: (params) => (
				<Link to={`/course/${grades[params.row.id-1].course}/details/`} title="View course details">
					{params.value}
				</Link>
			),
		},
		{ field: "student", headerName: "Student", width: 250, align: 'center', headerAlign: 'center',
			renderCell: (params) => (
				<Link to={`/student/${grades[params.row.id-1].student}/details/`} title="View student details">
					{params.value}
				</Link>
			),
		},
		{ field: "session", headerName: "Session", width: 100 , align: 'center', headerAlign: 'center', },
		{ field: "retake", headerName: "Retake", width: 100, align: 'center', headerAlign: 'center',   },
		{ field: "username", headerName: "Username", width: 150, align: 'center', headerAlign: 'center',
			renderCell: (params) => (
				<Link to={`/profile/${params.row.username}/`} title="View user profile">
					{params.value}
				</Link>
			),
		},
		{
		  field: "operations",
		  headerName: "Operations",
		  width: 150,
		  align: 'center', headerAlign: 'center',
		  renderCell: (params) => {
			  if (params.row.username === getUsername() || isModerator()) {
				  return (<Container>
					  <IconButton component={Link} sx={{ml: 3, mr: 3}} to={`/grade/${params.row.gid}/edit/`}>
						  <Tooltip title="Edit grade" arrow>
							  <EditIcon color="primary"/>
						  </Tooltip>
					  </IconButton>

					  <IconButton component={Link} sx={{mr: 3}} to={`/grade/${params.row.gid}/remove/`}>
						  <Tooltip title="Delete grade" arrow>
							  <DeleteForeverIcon sx={{color: "red"}}/>
						  </Tooltip>
					  </IconButton>
				  </Container>)
			  } else {
				  return (<IconButton component={Link} sx={{ml: 3, mr: 3}} to={`/grade/${params.row.gid}/details/`}>
					  <Tooltip title="View details" arrow>
						  <InfoIcon color="primary" />
					  </Tooltip>
				  </IconButton>)
			  }
		  }
		},
	  ];
	  
	  const rows = grades.map((grade, index) => {
		return {
		  id: index + 1,
		  course: grade.course_name,
		  student: grade.student_name,
		  session: grade.session,
		  retake: grade.retake,
		  username: grade.username,
		  user: grade.user,
		  gid: grade.gid, // add the gid field to use it in the operations renderer
		};
	  }); 

	
	return (
		<Container style={{width:"850px"}}>
			<h1 style={{paddingBottom: "20px", paddingTop: "60px"}}>
				Grade List
			</h1>
			{loading && <CircularProgress />}
			{!loading && grades.length === 0 && <p>No grades found</p>}
			{!loading && (
				<Box sx={{paddingBottom: "10px"}}>
					{isUser() ?
						(<IconButton component={Link} sx={{ mr: 3 }} to={`/grade/add/`}>
							<Tooltip title="Add a new grade" arrow>
								<AddIcon sx={{color: "green"}} />
							</Tooltip>
						</IconButton>) : null}
					<IconButton component={Link} sx={{ mr: 3 }} to={`/grade/filter/`}>
						<Tooltip title="Filter Grades" arrow>
							<FilterAltIcon sx={{ color: "blue" }} />
						</Tooltip>
					</IconButton>
			  </Box>
			)}
			{!loading && grades.length > 0 && (
				<Container style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
					<DataGrid
					columns={getUser()?columns:columns.slice(0, -1)}
					rows={rows}
					autoHeight
					hideFooter={true}
					/>
					<Paginator
                        totalRows={totalRows}
                        currentPage={page}
                        setPage={setCurrentPage}
                    />
				</Container>
			)}
		</Container>
	  );
	  
	  
  };