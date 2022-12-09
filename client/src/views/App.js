import './css/App.css';
import io from 'socket.io-client';
import {useState} from 'react'
import logo from './img/logo.png'; // with import
const socket = io('http://localhost:4000');

function App() {
  const [message, setMessage] = useState('')

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
