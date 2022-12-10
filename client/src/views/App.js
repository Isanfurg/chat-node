import './css/App.css';
import ReactDOM from 'react-dom/client';
import io from 'socket.io-client';
import {useEffect, useState} from 'react'
import logo from './img/logo.png'; // with import
import { Producto } from '../models/producto.model'
const socket = io('http://localhost:4000');

function App() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const receiveMessage = (message) => {
      setMessages([message, ...messages]);
    };
    socket.on('products',function changeView(res){
      
      console.log(res)
      let data = []
      let root = ReactDOM.createRoot(document.getElementById('root'))
      res.forEach(e => {
      var p = new Producto({
          price: e.price,
          name: e.name,
          state: e.state,
          url: e.url,
          actual_price: e.actual_price,
          socket: socket
        })
      data.push(p.toHMTL)
      });
      root.render(
        <div className="App">
        <header className="App-header">
          <div>
            <div className="card">       
                {data}
            </div>
  
          </div>
        </header>
      </div>
      )
    }
      
      
    );
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, [messages]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message)
    socket.emit('message',message)
  
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
  
  


export default App;
