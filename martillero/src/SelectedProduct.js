import * as React from 'react';
import ReactDOM from 'react-dom/client';
import {getHeader} from './components/Header'
import {Container, Grid,Paper,Button,FormControl, Input,InputAdornment} from '@mui/material'
import { styled } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SavingIcon from '@mui/icons-material/Savings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
})); 
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});


export function SelectedProduct(props,socket) {
 
  var amount = 0
  if(props.product.actual_price===0){
    props.product.actual_price=props.product.price
  }
  return (
    <ThemeProvider theme={darkTheme}>
    <Container  maxWidth={false}>
        {getHeader({
            title: "Sala de subasta",
            socket: socket
        })}
        <Grid container spacing={2}>
          <Grid item xs={12}>
           
          </Grid>
          <Grid item alignItems="center" xs={8}>
            <Item id='Messages' sx={{ height: '100%' }} >
              
              </Item>
          </Grid>
          <Grid item xs={4}>
            <Item sx={{ height: '100%' }} >
              <Button size="small" variant="contained" onClick={()=>{
                    socket.emit('leftRoom',props.product.id)
                  }} endIcon={<ArrowBackIcon />}>
                    Volver
                  </Button>
             <img
                src={props.product.url}
                alt="Producto"
                loading="lazy"
                width={'200px'}
                
              />
              <Item>Valor actual: {props.product.actual_price}</Item>
               <FormControl width={'70%'} sx={{ m: 1 }}  margin="normal" variant="standard">
                  <Input
                    id="standard-adornment-amount"
                    value={amount}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  />
                  <Button size="small" variant="contained" onClick={console.log(amount)} endIcon={<SavingIcon />}>
                    Pujar
                  </Button>
                  
            </FormControl>
               
            </Item>
          </Grid>
        </Grid>
    </Container>
    </ThemeProvider>
  );
}
