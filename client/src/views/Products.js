import * as React from 'react';
import './css/App.css';
import { Producto } from '../models/producto.model'

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  export function Products(props, socket){
    const rows = []
      props.forEach(e => {
      var p = new Producto({
          id: e.id,
          price: e.price,
          name: e.name,
          state: e.state,
          url: e.url,
          actual_price: e.actual_price,
          socket: socket
        })
      rows.push(p)  
    });
    return (
        <div className="App">
        <header className="App-header">
          <div>
            <TableContainer component={Paper} >
              <Table sx={{ minWidth: 650 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Objeto</StyledTableCell>
                    <StyledTableCell align="right">Valor Inicial</StyledTableCell>
                    <StyledTableCell align="right">Valor Actual</StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.price}</StyledTableCell>
                      <StyledTableCell align="right">{row.actual_price}</StyledTableCell>
                      <StyledTableCell align="right">
                        <Button variant="contained" onClick={()=>{
                          console.log(row.id)
                          socket.emit('joinAuction',row.id)
                      }}>Entrar</Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </header>
      </div>
    );    
  }