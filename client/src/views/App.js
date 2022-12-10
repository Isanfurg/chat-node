import './css/App.css';
import io from 'socket.io-client';
import {useEffect, useState} from 'react'
import logo from './img/logo.png'; // with import
import { Producto } from '../models/producto.model'
const socket = io('http://localhost:4000');

function App() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([]);
  var flag = 0;
  
  useEffect(() => {
    const receiveMessage = (message) => {
      setMessages([message, ...messages]);
    };

    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, [messages]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message)
    socket.emit('message',message)
    flag = 1;
    console.log(flag)
  }
  if(flag===1){
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
                    e => setMessage(e.target.value)
                  }/>
                  <button>Ingresar</button>
                </form>
              </div>
            </div>
  
          </div>
        </header>
      </div>
    );
  }
  if(flag===0){
    var p = new Producto({
    
      id: 0,
      name:"Manzana dorada",
      state: "EN SUBASTA",
      price: 10000,
      actual_price: 10000,
      url: ""

      })
      return p.toHMTL;
  }
  
  
}

export default App;
