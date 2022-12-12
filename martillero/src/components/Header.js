import * as React from 'react';
import { AppBar,Toolbar,IconButton,Typography ,Button} from '@mui/material';
export function getHeader(props){
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                    {props.title}
                </Typography>
                <Button> Agregar Producto</Button>
            </Toolbar>
        </AppBar>
    )
}