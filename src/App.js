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
import Trainning from './component/Hook/Trainning';
import { useState } from 'react';
import MemoParent from './component/Hook/MemoParent';
import ReducerUse from './component/Hook/ReducerUse';
import TodoReducer from './component/Hook/TodoReducer';

 window.io = socketio;

function App() {
  const [isShow, setIsShow] = useState(true)

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

  // const toggleComponent= () => {
  //   setIsShow(!isShow);
  // }

  // return (
  //   <>
  //   <div><button onClick={toggleComponent}>Toggle</button></div>

  //   { isShow && <TodoReducer />}</>
  );
}

export default App;
