import './css/App.css';
import ReactDOM from 'react-dom/client';
import io from 'socket.io-client';
import {useEffect, useState} from 'react'
import logo from './img/logo.png'; // with import
import {SelectedProduct} from './SelectedProduct';
import {Products} from './Products';
import {Box,CircularProgress} from '@mui/material'
import './css/App.css';
import { logs } from './logs';
const socket = io('http://localhost:4000');


function App() {

  
  useEffect(() => {
    
    socket.on('products', function changeView(data){
      console.log(data)
      let root = ReactDOM.createRoot(document.getElementById('root'))
      root.render(Products(data,socket))
    });
    socket.on('logs', function changeView(data){
      console.log(data)
      let root = ReactDOM.createRoot(document.getElementById('root'))
      root.render(logs(data,socket))
    });

    socket.on('joinRoom',function changeView(data){
      console.log(data)
      let root = ReactDOM.createRoot(document.getElementById('root'))
      root.render(SelectedProduct(data,socket))
    });
    socket.on("userJoinRoom", async (data)=>{
      console.log(data);
      const newDiv = document.createElement("p");

      // and give it some content
      const newContent = document.createTextNode("Join the room "+data);
      newDiv.appendChild(newContent)
      document.getElementById("Messages").appendChild(newDiv)
      
    })
    socket.on("userLeftRoom", async (data)=>{
      const newDiv = document.createElement("p");

      // and give it some content
      const newContent = document.createTextNode (data+" abandono la puja");
      newDiv.appendChild(newContent)
      document.getElementById("Messages").appendChild(newDiv)
      
    })
    return () => {
      socket.off("discconect");
    };
  }, []);
    
    socket.emit('username',"MARTILLERO")
    return (
      <Box sx={{ display: 'flex' } }>
      <CircularProgress />
      </Box>
    );
  }
  
  


export default App;
