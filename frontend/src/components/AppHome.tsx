import {Typography, CssBaseline, Box} from "@mui/material";
import React from "react";
import {Container} from "@mui/system";

export const AppHome = () => {
	return (
        <React.Fragment>
            <Container maxWidth="sm">
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <img src="../../img.png" alt="Example Image" style={{ width: '100%'}}/>
                </Box>
            </Container>
		</React.Fragment>
	);
};
