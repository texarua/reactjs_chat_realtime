import './App.css';

import Echo from 'laravel-echo';
import socketio from 'socket.io-client';

import Message from './component/Message';

 window.io = socketio;

function App() {
  window.Echo = new Echo({
      broadcaster: 'socket.io',
      host: 'http://127.0.0.1:6001/',
      client: socketio,
      transports: ["websocket", "polling", "flashsocket"],
  });

  return (
    <><Message /></>
  );
}

export default App;
