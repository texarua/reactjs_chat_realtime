import Echo from "laravel-echo";
import socketio from 'socket.io-client';

let $token = JSON.parse(localStorage.getItem('authData'))?.data?.access_token;
if (!window.Echo) {
    window.Echo = new Echo({
    transport: ['websocket', 'polling', 'flashsocket'],
    client: socketio,
    broadcaster: "socket.io",
    host: "http://localhost:6001",
    auth: {
        headers: {
          Authorization: `Bearer ${$token}`
        }
    }
  })
}



