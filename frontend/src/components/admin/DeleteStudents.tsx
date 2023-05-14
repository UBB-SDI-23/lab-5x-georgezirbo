import React, { useEffect, useState } from "react";
import { Student } from "../../models/Student";
import {DataGrid, GridColDef, GridRowId} from "@mui/x-data-grid";
import {CircularProgress, IconButton, Tooltip, Box, Checkbox, Button} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {Link, Navigate, useNavigate} from "react-router-dom";
import { Container } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import { BACKEND_API_URL } from "../../../constants";
import { BarChart } from "@mui/icons-material";
import {Paginator} from "../Pagination";
import {getUser, getUsername, isAdmin, isModerator, isUser} from "../utils";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const DeleteStudents = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([])
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);
    const [totalRows, setTotalRows] = useState(0);
    const crt = (page - 1) * pageSize + 1;
    const [isLastPage, setIsLastPage] = useState(false);
    const navigate = useNavigate();

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
        const config = await axios.get(`${BACKEND_API_URL}settings/pagesize/`);
        const DefaultPageSize = parseInt(config.data.size);
        setPageSize(DefaultPageSize);
        const start=new Date().getTime()
        const response = await fetch(
            `${BACKEND_API_URL}student/?page=${page}&page_size=${DefaultPageSize}`
        );
        console.log(`GET STUDENTS: ${(new Date().getTime() - start)/1000} seconds`)
        const { count, next, previous, results } = await response.json();
        setStudents(results);
        setTotalRows(count);
        setIsLastPage(!next);
        setLoading(false);
    };


    const deleteStudents = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.delete(`${BACKEND_API_URL}delete/students/`, { data: { ids: selectedIds } });
            window.location.reload();
        } catch (error) {
            console.log(error);
            alert('An error occurred while deleting the students.');
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [page]);

    if (!loading && students.length === 0) {
        return <div>No students</div>;
    }

    const columns: GridColDef[] = [
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
        { field: "username", headerName: "Username", width: 150, align: 'center', headerAlign: 'center',
            renderCell: (params) => (
                <Link to={`/profile/${params.row.username}/`} title="View user profile">
                    {params.value}
                </Link>
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
            checked: false,
            id: index + 1,
            fname: student.fname,
            lname: student.lname,
            cnp: student.cnp,
            email: student.email,
            phone: student.phone,
            courses: student.no_courses,
            username: student.username,
            user: student.user,
            sid: student.sid ? student.sid : 0,
        };
    });

    const handleSelect = (newSelection: GridRowId[]) => {
        const selectedIds: number[] = [];
        const selectedRowsData = newSelection.map((id) =>
            rows.find((row) => row.id === id)
        );
        selectedRowsData.forEach((row) => {
            if (row?.sid) {
                selectedIds.push(row.sid);
            }
        });
        setSelectedIds(selectedIds);
    };

    return !isAdmin() ? (<Navigate to='/no-permission/' />) : (
        <Container style={{flexDirection: 'column', width: totalWidth}}>
            <h1 style={{paddingBottom: "20px", paddingTop: "60px"}}>
                Delete students
            </h1>
            {loading && <CircularProgress />}
            {!loading && students.length === 0 && <p>No students found</p>}
            {!loading && students.length > 0 && (
                <Container style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                    <IconButton component={Link} sx={{ mr: 3, mb: 2}} to={`/data/`}>
                        <ArrowBackIcon />
                    </IconButton>
                    <DataGrid
                        columns={columns}
                        rows={rows}
                        checkboxSelection
                        onRowSelectionModelChange={handleSelect}
                        autoHeight
                        hideFooter={true}
                    />
                    <Button
                        variant="contained"
                        disabled={!selectedIds.length}
                        sx={{
                            width: "250px",
                            marginTop: "20px",
                            backgroundColor: "primary",
                            color: "#fff",
                            "&:hover": {
                                backgroundColor: "black",
                                color: "white",
                                borderColor: "white",
                            },
                        }}
                        onClick={deleteStudents}
                    >
                        Delete students
                    </Button>
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