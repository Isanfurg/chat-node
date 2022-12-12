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
      newDiv.style.cssText = 'box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); margin: 10px;';
      // and give it some content
      const newContent = document.createTextNode("Join the room "+data);
      newDiv.appendChild(newContent)
      document.getElementById("Messages").appendChild(newDiv)
      
    });
    socket.on('nuevaPuja', async (data)=>{
      console.log(data);
      const newDiv = document.createElement("p");
      newDiv.style.cssText = 'box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); margin: 10px;';
      // and give it some content
      const newContent = document.createTextNode(data.user+": "+data.monto);
      newDiv.appendChild(newContent)
      document.getElementById("Messages").appendChild(newDiv)
    })
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
