import * as React from 'react';
import { AppBar,Toolbar,IconButton,Typography } from '@mui/material';
export function getHeader(props){
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                
                </IconButton>
                <Typography variant="h6" color="inherit" component="div">
                    {props.title}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}