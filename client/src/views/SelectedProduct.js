import * as React from 'react';
import {getHeader} from './components/Header'
import {Container, Grid,Paper,Button,FormControl, Input,InputAdornment} from '@mui/material'
import { styled } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SavingIcon from '@mui/icons-material/Savings';
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
 
  const values = React.useState<[]>({
    amount: 0
  })
  return (
    <ThemeProvider theme={darkTheme}>
    <Container maxWidth="xxl">
        {getHeader({
            title: "Sala de subasta",
        })}
        <Grid container spacing={2}>
          <Grid item xs={12}>
           
          </Grid>
          <Grid item xs={8}>
            <Item  sx={{ height: '100%' }} className='Messages'>Messages</Item>
          </Grid>
          <Grid item xs={4}>
            <Item sx={{ height: '100%' }} >
             <img
                src={props.product.url}
                alt="Producto"
                loading="lazy"
                width={'100%'}
              />
               <FormControl width={'70%'} sx={{ m: 1 }}  margin="normal" variant="standard">
                  <Input
                    id="standard-adornment-amount"
                    value={values.amount}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  />
                  <Button size="small" variant="contained" endIcon={<SavingIcon />}>
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
