import './css/App.css';
import ReactDOM from 'react-dom/client';
import io from 'socket.io-client';
import {useEffect, useState} from 'react'
import logo from './img/logo.png'; // with import
import {SelectedProduct} from './SelectedProduct';
import {Products} from './Products';

const socket = io('http://localhost:4000');

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

    socket.on('nuevaPuja', async (data)=>{
      console.log(data);
      const newDiv = document.createElement("div");
      newDiv.style.cssText = '  position: relative;padding: 10px 20px;color: white;background: #0B93F6;border-radius: 25px;float: right;font-weight: bold';
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
    socket.on('endPuja',)
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
                </form>
              </div>
            </div>
  
          </div>
        </header>
      </div>
    );
  }
  
  


export default App;
