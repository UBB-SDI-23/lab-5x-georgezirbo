import React, { useEffect, useState } from "react";
import { Teacher } from "../../models/Teacher";
import {DataGrid, GridColDef, GridRowId} from "@mui/x-data-grid";
import {CircularProgress, IconButton, Button} from "@mui/material";
import {Link, Navigate} from "react-router-dom";
import { Container } from "react-bootstrap";
import { BACKEND_API_URL } from "../../../constants";
import {Paginator} from "../Pagination";
import {isAdmin} from "../utils";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const DeleteTeachers = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([])
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);
    const [totalRows, setTotalRows] = useState(0);
    const [isLastPage, setIsLastPage] = useState(false);

    const setCurrentPage = (newPage: number) => {
        setPage(newPage);
    }

    const fetchTeachers = async () => {
        setLoading(true);
        const config = await axios.get(`${BACKEND_API_URL}settings/pagesize/`);
        const DefaultPageSize = parseInt(config.data.size);
        setPageSize(DefaultPageSize);
        const start=new Date().getTime()
        const response = await fetch(
            `${BACKEND_API_URL}teacher/?page=${page}&page_size=${DefaultPageSize}`
        );
        console.log(`GET STUDENTS: ${(new Date().getTime() - start)/1000} seconds`)
        const { count, next, previous, results } = await response.json();
        setTeachers(results);
        setTotalRows(count);
        setIsLastPage(!next);
        setLoading(false);
    };

    const deleteTeachers = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.delete(`${BACKEND_API_URL}delete/teachers/`, { data: { ids: selectedIds } });
            window.location.reload();
        } catch (error) {
            console.log(error);
            alert('An error occurred while deleting the teachers.');
        }
    };

    useEffect(() => {
        fetchTeachers();
    }, [page]);

    if (!loading && teachers.length === 0) {
        return <div>No teachers</div>;
    }

    const columns: GridColDef[] = [
        { field: "fname", headerName: "First name", width: 100},
        { field: "lname", headerName: "Last name", width: 100, align: 'center', headerAlign: 'center',},
        { field: "rank", headerName: "Rank", width: 120, align: 'center', headerAlign: 'center' },
        { field: "courses", headerName: "# of courses", width: 100, align: 'center', headerAlign: 'center', },
        { field: "descr", headerName: "Description", width: 200, align: 'center', headerAlign: 'center', },
        { field: "username", headerName: "Username", width: 150, align: 'center', headerAlign: 'center',},

    ];

    let totalWidth = 0;
    columns.forEach((column) => {
        if (column.width) {
            totalWidth += column.width;
        }
    });

    const getValue: {[key: string]: string} = {
        "P": "Professor",
        "L": "Lecturer",
        "A": "Associate"
    };

    const rows = teachers.map((teacher, index) => {
        return {
            checked: false,
            id: index + 1,
            fname: teacher.fname,
            lname: teacher.lname,
            rank: getValue[teacher.rank],
            descr: teacher.descr,
            courses: teacher.no_courses,
            username: teacher.username,
            user: teacher.user,
            tid: teacher.tid,
        };
    });

    const handleSelect = (newSelection: GridRowId[]) => {
        const selectedIds: number[] = [];
        const selectedRowsData = newSelection.map((id) =>
            rows.find((row) => row.id === id)
        );
        selectedRowsData.forEach((row) => {
            if (row?.tid) {
                selectedIds.push(row.tid);
            }
        });
        setSelectedIds(selectedIds);
    };

    return !isAdmin() ? (<Navigate to='/no-permission/' />) : (
        <Container style={{flexDirection: 'column', width: totalWidth}}>
            <h1 style={{paddingBottom: "20px", paddingTop: "60px"}}>
                Delete teachers
            </h1>
            {loading && <CircularProgress />}
            {!loading && teachers.length === 0 && <p>No teachers found</p>}
            {!loading && teachers.length > 0 && (
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
                        onClick={deleteTeachers}
                    >
                        Delete teachers
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