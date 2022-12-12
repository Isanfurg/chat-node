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

  export function Products(props, socket){
    const rows = []
      props.forEach(e => {
      if (e.actual_price ===0) e.actual_price = e.price
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
      <ThemeProvider theme={darkTheme}>
    <Container  maxWidth={false}>
        {getHeader({
          title: "Bienvenido Martillero!",
          socket: socket
        })}
        <TableContainer component={Paper} >
          <Table sx={{ minWidth: 800 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell>Imagen</StyledTableCell>
                <StyledTableCell align="right">Valor Inicial</StyledTableCell>
                <StyledTableCell align="right">Valor Actual</StyledTableCell>
                <StyledTableCell align="right">Estado</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
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
                      alt="Producto"
                      loading="lazy"
                      height={'50px'}
                      
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.price}</StyledTableCell>
                  <StyledTableCell align="right">{row.actual_price}</StyledTableCell>
                  <StyledTableCell align="right">{row.state}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button size="small" variant="outlined" disabled={row.state !== "EN SUBASTA"}onClick={()=>{
                      console.log(row.id)
                      socket.emit('joinAuction',row.id)
                  }}>Entrar</Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      </ThemeProvider>
    );    
  }