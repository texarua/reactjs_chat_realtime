import './App.css';

import Echo from 'laravel-echo';
import socketio from 'socket.io-client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Message from './component/Message';
import Login from './component/Login';

 window.io = socketio;

function App() {
  // window.Echo = new Echo({
  //     broadcaster: 'socket.io',
  //     host: 'http://127.0.0.1:6001/',
  //     client: socketio,
  //     transports: ["websocket", "polling", "flashsocket"],
  // });

  return (
    <Routes>
      <Route exact path="/" Component={Message } />
      <Route path="/login" Component={Login } />
  </Routes>
  );
}

export default App;
