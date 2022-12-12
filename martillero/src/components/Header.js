import * as React from 'react';
import ReactDOM from 'react-dom/client';
import {AddProduct} from '../AddProduct'
import { AppBar,Toolbar,IconButton,Typography ,Button} from '@mui/material';
export function getHeader(props){
    var show = false 
    console.log("Agregar producto" === props.title)
    if (props.title==="Agregar producto" || props.title==="Sala de subasta"){
        show = true
    }
    console.log(!show)
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                    {props.title}
                </Typography>
                <Button disabled={show} onClick={()=>{
                    let root = ReactDOM.createRoot(document.getElementById('root'))
                    root.render(AddProduct(props.socket))
                }}> Agregar Producto</Button>
                <Button disabled={show} onClick={()=>{
                   props.socket.emit("getLogs")
                }}> Logs</Button>
                <Button disabled={!show} onClick={()=>{
                   props.socket.emit('username',"MARTILLERO")
                }}> Volver</Button>
            </Toolbar>
        </AppBar>
    )
}