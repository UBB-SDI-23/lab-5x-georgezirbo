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
import {Paginator} from "../Pagination"

export const GradeFilter = () => {
	const [grades, setGrades] = useState<Grade[]>([]);
    const [loading, setLoading] = useState(false);
    const [MinFinal, setMinFinal] = useState(0);
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

    const fetchGrades = async () => {
        setLoading(true);
        const start = new Date().getTime()
        const response = await fetch(
          `${BACKEND_API_URL}grade/?final-gte=${MinFinal}&page=${page}&page_size=${pageSize}`
        );
        console.log(`GET GRADES FILTER: ${(new Date().getTime() - start)/1000} seconds`)
        const { count, next, previous, results } = await response.json();
        setGrades(results);
        setTotalRows(count);
        setIsLastPage(!next);
        setLoading(false);
      };
    
      useEffect(() => {
        fetchGrades();
      }, [page]);
    
    const handleFilterClick = async() => {
        setLoading(true);
        const start = new Date().getTime()
        const response = await fetch(
            `${BACKEND_API_URL}grade/?final-gte=${MinFinal}`
        );
        console.log(`GET GRADES FILTER: ${(new Date().getTime() - start)/1000} seconds`)
        const { count, next, previous, results } = await response.json();
        setGrades(results);
        setTotalRows(count);
        setIsLastPage(!next);
        setLoading(false);
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
		  student: grade.student_name,
		  session: grade.session,
		  retake: grade.retake,
		  gid: grade.gid, // add the gid field to use it in the operations renderer
		};
	  }); 

	
	return (
		<Container style={{width:"700px"}}>
			<h1 style={{paddingBottom: "20px", paddingTop: "60px"}}>
				Filter Grade List
			</h1>
			{loading && <CircularProgress />}
			{!loading && grades.length === 0 && <p style={{marginBottom: "50px"}}>No grades</p>}
            {!loading && (
                <Box sx={{display: 'flex', justifyContent: 'flex-start', paddingBottom: "10px"}}>
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
                        sx={{ width: 100, mr: 2 }}
                    />
                    <Button variant="contained" sx={{width: 100}} startIcon={<FilterAltIcon/>} onClick={handleFilterClick} disabled={!MinFinal}>
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