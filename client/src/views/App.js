import './css/App.css';
import ReactDOM from 'react-dom/client';
import io from 'socket.io-client';
import {useEffect, useState} from 'react'
import logo from './img/logo.png'; // with import
import {SelectedProduct} from './SelectedProduct';
import {Products} from './Products';

var socket = io('34.27.233.242');

function App() {
  const [username, setUsername] = useState('')
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    
    socket.on('products', function changeView(data){
      console.log(data)
      let root = ReactDOM.createRoot(document.getElementById('root'))
      root.render(Products(data,socket))
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
      
    });
    socket.on("userLeftRoom", async (data)=>{
      console.log(data);
      const newDiv = document.createElement("p");
      // and give it some content
      const newContent = document.createTextNode("** El usuario " +data  +" abandono la puja **");
      newDiv.appendChild(newContent)
      document.getElementById("Messages").appendChild(newDiv)
      
    });

    
    socket.on("alert", async (data)=>{
      console.log(data);
      const newDiv = document.createElement("p");
      // and give it some content
      const newContent = document.createTextNode("** El martillero ha anunciado " +data+" **");
      newDiv.appendChild(newContent)
      document.getElementById("Messages").appendChild(newDiv)
      
    });

    socket.on('nuevaPuja', async (data)=>{
      console.log(data);
      const newDiv = document.createElement("p");
      newDiv.style.cssText = '  width:100%; position: relative;padding: 10px 20px;color: white;background: #0B93F6;border-radius: 25px;float: right;font-weight: bold';
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
      socket.emit('leftRoom',data)
    })
    socket.on("connect_error", (err) => {
      let error = document.getElementById("ERROR")
      
      
      const message = document.createElement("p");
      let nm = document.createTextNode( "NO HAY COMUNICACION CON EL SERVIDOR");
      message.style.cssText = 'color: red; font-size:12px';
      message.appendChild(nm)
      if(error.children.length>0){
        error.removeChild(error.firstChild)
      }
      
      error.appendChild(message)

      console.log(`connect_error due to ${err.message}`);
    });
    return () => {
      socket.off("discconect");
    };
  }, [messages]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('username',username)
  
  }
  
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <div className="card">       
            <img src={logo} alt="logo"width="50%"/>   
              <div className="container">
                
               
                <form className ="form" onSubmit={handleSubmit}>
                  <h4>Ingrese su nombre</h4>
                  <input type='text' onChange={
                    e => setUsername(e.target.value)
                  }/>
                  <button>Ingresar</button>
                  <div id='ERROR'></div>
                </form>
              </div>
            </div>
  
          </div>
        </header>
      </div>
    );
  }
  
  


export default App;
