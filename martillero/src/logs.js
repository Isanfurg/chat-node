import * as React from 'react';
import './css/App.css';
import { Producto } from './models/producto.model'
import { getHeader} from './components/Header'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});
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

  export function logs(props, socket){
    const rows = []
    var total = 0
      props.forEach(e => {
      if (e.actual_price ===0) e.actual_price = e.price
      var p = new Producto({
          id: e.id,
          price: e.price,
          name: e.name,
          state: e.state,
          url: e.url,
          actual_price: e.actual_price,
          socket: socket,
          buyer: e.buyer
        })
      if(p.state==="SUBASTADO"){
        rows.push(p)
        total += p.actual_price
    }
    })
    var p = new Producto({
        id: "",
        price: "",
        name: "",
        state: "",
        url: "",
        actual_price: total,
        socket: socket,
        buyer: "TOTAL DE VENTAS"
      })
      rows.push(p)
    
    return (
      <ThemeProvider theme={darkTheme}>
    <Container  maxWidth={false}>
        {getHeader({
          title: "Resumen",
          socket: socket
        })}
        <TableContainer component={Paper} >
          <Table sx={{ minWidth: 800 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell>Imagen</StyledTableCell>
                <StyledTableCell align="right">Comprado por</StyledTableCell>
                <StyledTableCell align="right">Vendido por</StyledTableCell>
                
                
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow
                  key={row.state}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    <img
                      src={row.url}
                      alt=""
                      loading="lazy"
                      height={'50px'}
                      
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.buyer}</StyledTableCell>
                  <StyledTableCell align="right">{row.actual_price}</StyledTableCell>
                 
                 
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      </ThemeProvider>
    );    
  }