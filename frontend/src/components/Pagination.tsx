import {debounce, parseInt} from "lodash";
import { useCallback, useEffect } from "react";
import {Box, IconButton, MenuItem, TextField} from '@mui/material';
import { useState } from "react";
import {getAccessToken, isAdmin} from "./utils";
import axios from "axios";
import {BACKEND_API_URL} from "../../constants";

interface PaginatorProps {
    totalRows: number;
    currentPage: number;
    setPage: (page: number) => void;
}

export const Paginator = ({totalRows, currentPage,  setPage}: PaginatorProps) => {
    const [rowsPerPage, setRowsPerPage] = useState<number>(25);

    useEffect(() => {
        const getDefaultPageSize = async () => {
            try {
                const response = await axios.get(`${BACKEND_API_URL}settings/pagesize/`);
                setRowsPerPage(parseInt(response.data.size));
            } catch (error) {
                console.error(error);
            }
        };

        getDefaultPageSize();
    }, []);
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    const changeCurrentPage = (pageNumber: number) => {
        if (pageNumber < 1) {
            setPage(1);
            return;
        }
        else if (pageNumber > totalPages) {
            setPage(totalPages);
            return;
        }
        setPage(pageNumber);
    }
    const [buttons, setButtons] = useState<(string | number)[]>([]);
    const [activeIndex, setActiveIndex] = useState<number>(currentPage);

    function generateButtons(current: number, end: number): void {
        const pages = [];
        if (current <= 8) {
            for (let i = 1; i < current + 6; i++) {
                pages.push(i);
            }
            pages.push('...');
            for (let i = end - 4; i <= end; i++) {
                pages.push(i);
            }
        } else if (end - 11 <= current) {
            for (let i = 1; i < 6; i++) {
                pages.push(i);
            }
            pages.push('...');
            for (let i = current - 5; i <= end; i++) {
                pages.push(i);
            }
        } else {
            for (let i = 1; i < 6; i++) {
                pages.push(i);
            }
            pages.push('...');
            for (let i = current - 5; i < current + 6; i++) {
                pages.push(i);
            }
            pages.push('...');
            for (let i = end - 4; i <= end; i++) {
                pages.push(i);
            }
        }
        setButtons(pages);
    }

    useEffect(() => {
        generateButtons(currentPage, totalPages);
    }, [currentPage, totalPages]);

    const debounceOnChange = useCallback(debounce(changeCurrentPage, 500), []);

    useEffect(() => {
        return () => {
            debounceOnChange.cancel();
        };
    }, [debounceOnChange])

    const editDefaultPageSize = async (pagesize: number) => {
        try{
            const response = await axios.put(`${BACKEND_API_URL}settings/pagesize/`, {size: pagesize}, {
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                },
            });
            await console.log(response.data);
        }catch(error){
            console.log(error);
            alert(error);
        }
    };

    return (
        <Box display="flex" justifyContent="center" sx={{mt: 3}}>
            <p style={{marginRight: "20px"}}>See page:</p>
            {buttons.map((button, index) => (
                <IconButton
                    key={index}
                    onClick={() => { setActiveIndex(button as number); changeCurrentPage(button as number)}}
                    disabled={button === '...'}
                    sx={{
                        fontSize: 16,
                        borderRadius: 1,
                        fontWeight: activeIndex === button ? 'bold' : 'normal',
                        textDecoration: activeIndex === button ? 'underline' : 'none',
                        color: 'blue'
                    }}
                >
                    {button}
                </IconButton>
            ))}
            <p style={{marginLeft: "20px"}}>  ({totalRows} results)</p>
            {isAdmin() ?
                (<TextField
                id="pagesize"
                label="Size"
                variant="outlined"
                fullWidth
                select
                defaultValue=""
                sx={{ mb: 2, ml: 5, textAlign: "left" }}
                onChange={(event) => {editDefaultPageSize(parseInt(event.target.value)); window.location.reload();}}
            >
                <MenuItem value="10">10</MenuItem>
                <MenuItem value="25">25</MenuItem>
                <MenuItem value="50">50</MenuItem>
                <MenuItem value="100">100</MenuItem>
            </TextField>) : null}
        </Box>

    )
}
