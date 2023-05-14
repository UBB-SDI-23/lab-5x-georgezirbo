
import React from "react";
import {Container} from "@mui/system";
import {logOut} from "./utils";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const NoPermission = () => {
    const navigate  = useNavigate();
    return (
        <React.Fragment>
            <Container maxWidth="sm">
            <p style={{color: 'red', fontSize: 24}}>
                Unfortunately, you don't have permissions to perform this operation.
            </p>
                <Button style={{ backgroundColor: "red", color: "white", width: "100%" }} onClick={()=>{navigate('/')}}>
                    Home
                </Button>
            </Container>
    </React.Fragment>
    );
};
