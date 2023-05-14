import React, { useEffect, useState } from "react";
import { User } from "../../models/User";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CircularProgress, IconButton, Tooltip, Box, Checkbox} from "@mui/material";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {Link, Navigate} from "react-router-dom";
import { Container } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import { BACKEND_API_URL } from "../../../constants";
import { BarChart } from "@mui/icons-material";
import {Paginator} from "../Pagination";
import {getUser, getUsername, isAdmin, isModerator, isUser} from "../utils";
import axios from "axios";

export const UsersAll = () => {
    const [users, setUsers] = useState<User[]>([]);
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

    const fetchUsers = async () => {
        setLoading(true);
        const config = await axios.get(`${BACKEND_API_URL}settings/pagesize/`);
        const DefaultPageSize = parseInt(config.data.size);
        setPageSize(DefaultPageSize);
        const start=new Date().getTime()
        const response = await fetch(
            `${BACKEND_API_URL}user/?page=${page}&page_size=${DefaultPageSize}`
        );
        console.log(`GET USERS: ${(new Date().getTime() - start)/1000} seconds`)
        const { count, next, previous, results } = await response.json();
        setUsers(results);
        setTotalRows(count);
        setIsLastPage(!next);
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, [page]);

    if (!loading && users.length === 0) {
        return <div>No users</div>;
    }

    const columns: GridColDef[] = [

        { field: "index", headerName: "#", width: 20 },
        { field: "username", headerName: "Username", width: 100, align: 'center', headerAlign: 'center',
            renderCell: (params) => (
                <Link to={`/profile/${params.row.username}/`} title="View user profile">
                    {params.value}
                </Link>
            ),
        },
        { field: "role", headerName: "Role", width: 100, align: 'center', headerAlign: 'center'},
        {
            field: "operations",
            headerName: "Operations",
            width: 150,
            align: 'center', headerAlign: 'center',
            renderCell: (params) => {
                return (
                    <Container>
                        <IconButton component={Link} sx={{ml: 3, mr: 3}} to={`/user/${params.row.id}/edit/`}>
                            <Tooltip title="Edit user" arrow>
                                <EditIcon color="primary"/>
                            </Tooltip>
                        </IconButton>

                        <IconButton component={Link} sx={{mr: 3}} to={`/user/${params.row.id}/remove/`}>
                            <Tooltip title="Delete user" arrow>
                                <DeleteForeverIcon sx={{color: "red"}}/>
                            </Tooltip>
                        </IconButton>
                    </Container>)
            },
        },
    ];

    let totalWidth = 0;
    columns.forEach((column) => {
        if (column.width) {
            totalWidth += column.width;
        }
    });

    const rows = users.map((user, index) => {
        if (user.is_superuser){
            user.role = 'admin';
        } else if (user.is_staff) {
            user.role = 'moderator';
        } else {
            user.role = 'user';
        }
        return {
            index: index + 1,
            username: user.username,
            role: user.role,
            id: user.id
        };
    });


    return !isAdmin() ? (<Navigate to='/no-permission/' />) : (
        <Container style={{flexDirection: 'column', width: totalWidth}}>
            <h1 style={{paddingBottom: "20px", paddingTop: "60px"}}>
                User List
            </h1>
            {loading && <CircularProgress />}
            {!loading && users.length === 0 && <p>No users found</p>}
            {!loading && users.length > 0 && (
                <Container style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap',}}>
                    <DataGrid
                        columns={columns}
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