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
var socket = io('34.27.233.242');


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
      const newContent = document.createTextNode("** El usuario " +data  +" se unio a la puja **");
      newDiv.appendChild(newContent)
      document.getElementById("Messages").appendChild(newDiv)
      
    })
    socket.on("userLeftRoom", async (data)=>{
      console.log(data);
      const newDiv = document.createElement("p");
      // and give it some content
      const newContent = document.createTextNode("** El usuario " +data  +" abandono la puja **");
      newDiv.appendChild(newContent)
      document.getElementById("Messages").appendChild(newDiv)
      
    })

    socket.on('nuevaPuja', async (data)=>{
      console.log(data);
      const newDiv = document.createElement("p");
      newDiv.style.cssText = ' width:100%; position: relative;padding: 10px 20px;color: white;background: #0B93F6;border-radius: 25px;float: right;font-weight: bold';
      // and give it some content
      const newContent = document.createTextNode("El usuario " + data.user+" realizo una puja por "+data.monto);
      newDiv.appendChild(newContent)
      document.getElementById("Messages").appendChild(newDiv)
      let price = document.getElementById("Price")
      price.removeChild(price.lastElementChild)
      const newPrice = document.createElement("p");
      let news = document.createTextNode( "Valor actual: "+data.monto);
      newPrice.appendChild(news)
      price.appendChild(newPrice)
    })
    
    socket.on('endPuja', async (data)=>{
      console.log(data);
      const newDiv = document.createElement("p");
      // and give it some content
      const newContent = document.createTextNode("** " +data+" **");
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
