import './css/App.css';
import ReactDOM from 'react-dom/client';
import io from 'socket.io-client';
import {useEffect, useState} from 'react'
import logo from './img/logo.png'; // with import
import { Producto } from '../models/producto.model'
const socket = io('http://localhost:4000');

function App() {
  const [username, setUsername] = useState('')
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket.on('products',function changeView(res){
      let data = []
      let root = ReactDOM.createRoot(document.getElementById('root'))
      res.forEach(e => {
      var p = new Producto({
          id: e.id,
          price: e.price,
          name: e.name,
          state: e.state,
          url: e.url,
          actual_price: e.actual_price,
          socket: socket
        })
      data.push(p.toHMTL())
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
    socket.on('joinRoom',function changeView(data){

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
            <div className="card items-center justify-center">       
            <img src={logo} alt="logo" width="50%"/>   
              <div className="container">
                <form className ="form" onSubmit={handleSubmit}>
                  <h4>Ingrese su nombre</h4>
                  <div><input className="input" type="text" onChange={
                    e => setUsername(e.target.value)
                  }/></div>
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
