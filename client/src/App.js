import '.css/App.css';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

function App() {
  const [message, setMessage] = userState('')
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello dick!</h1>
      </header>
    </div>
  );
}

export default App;
