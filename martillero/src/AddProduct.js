import * as React from 'react';
import {getHeader} from './components/Header'
import {Container, Grid,Paper,Button,FormControl, Input,InputAdornment, TextField} from '@mui/material'
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


export function AddProduct(socket) {
 
  var price = 0
  var name = 0
  var state = "EN SUBASTA"
  var url = ""

  return (
    <ThemeProvider theme={darkTheme}>
    <Container  maxWidth={false}>
        {getHeader({
            title: "Agregar producto",
            
            socket: socket
        })}
        <Grid item minWidth={"xl"} xs ={12} spacing={2}>
          <Item id='Messages' sx={{ widht: '100%' }} >
            <FormControl fullWidth>
             
              <TextField
              sx={{ margin: 3}}
              label="Nombre producto"
              onChange = {e => name = e.target.value}
              
            />
             <TextField
             sx={{ margin: 3}}
              label="Valor"
              onChange = {e => price = e.target.value}
              
            />
             <TextField
             sx={{ margin: 3}}
              label="Url imagen"
              onChange = {e => url = e.target.value}
              
            />
            <Button sx={{ margin: 3}} size="large" variant="contained" onClick={() => {
                socket.emit('addProduct',{
                  name: name,
                  price: price,
                  state: state,
                  url: url
                });
              }} endIcon={<SavingIcon />}>
              Añadir
            </Button>
                  
            </FormControl>
          </Item>
          
        </Grid>
    </Container>
    </ThemeProvider>
  );
}
