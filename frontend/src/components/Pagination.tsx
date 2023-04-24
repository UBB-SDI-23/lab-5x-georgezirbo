import { debounce } from "lodash";
import { useCallback, useEffect } from "react";
import { Box, IconButton, TextField, Typography } from '@mui/material';
import {ArrowForward, ArrowBack } from '@mui/icons-material'

interface PaginatorProps {
    rowsPerPage: number;
    totalRows: number;
    currentPage: number;
    setPage: (page: number) => void;
    goToNextPage: () => void;
    goToPrevPage: () => void;
}

export const Paginator = ({ rowsPerPage, totalRows, currentPage,  setPage, goToNextPage, goToPrevPage }: PaginatorProps) => {

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

    const debounceOnChange = useCallback(debounce(changeCurrentPage, 500), []);

    useEffect(() => {
        return () => {
            debounceOnChange.cancel();
        };
    }, [debounceOnChange])

    return (
        <Box display="flex" alignItems="center">
            <IconButton
                color="primary"
                disabled={currentPage === 1}
                onClick={goToPrevPage}
                style={{ marginRight: '10px' }}
            >
                <ArrowBack />
            </IconButton>

            <TextField
                variant="outlined"
                size="small"
                type="number"
                value={currentPage}
                onChange={(event) => debounceOnChange(Number(event.target.value))}
                style={{ margin: '10px', width: '100px'}}
                inputProps={{ style: { textAlign: 'center' } }}
            />

            <Typography style={{ marginRight: '10px' }}>
                of {totalPages}
            </Typography>

            <IconButton
                color="primary"
                disabled={currentPage === totalPages}
                onClick={goToNextPage}
            >
                <ArrowForward />
            </IconButton>
        </Box>

    )
}