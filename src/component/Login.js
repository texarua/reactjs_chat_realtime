import '../App.css';
import React, { useState, useEffect } from 'react';
import api from './api';
import { Link, useNavigate   } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Login(props) {
//   const [isOnline, setIsOnline] = useState(null);
const [loginData, setLoginData] = useState({
  email: '',
  password: '',
});
const [channel, setChannel] = useState(1);
  useEffect(() => {
    console.log(document.cookie)
    api.get('/me', loginData, {
      withCredentials: true,
    }).then(
      response => {
        console.log(response);
          // setCookie('authData', JSON.stringify(response.data));
          // navigate('/');
      }
    ).catch(err => console.log(err))
  },[channel]);
const navigate = useNavigate();

const doLogin = (e) => {
  e.preventDefault();
  api.post('/auth/login', loginData, {
  }).then(
    response => {
      console.log(response);
      localStorage.setItem('authData', JSON.stringify(response.data))
        // setCookie('authData', JSON.stringify(response.data));
        // navigate('/');
    }
  ).catch(err => console.log(err))
}

const prepareData = (e) => {
  setLoginData({...loginData,[e.target.name] : e.target.value});
}

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <form onSubmit={doLogin} className="box">
              <h1>Login</h1>
              <p className="text-muted"> Please enter your login and password!</p>
              <input type="text" name="email" value={loginData.email} placeholder="Email" onChange={prepareData} required="requied" autoFocus={true} />
              <input type="password" name="password" value={loginData.password} onChange={prepareData}  placeholder="Password" required="requied" />
              <div className="form-group mb-3">
                  <label className="text-muted" htmlFor="remember">Remember me</label>
                  <input type="checkbox" name="remember" value="1" />
            </div>
              <input type="submit" name="" value="Login" href="#" />
              <div className="col-md-12">
                <ul className="social-network social-circle">
                  <li><Link href="#" className="icoFacebook" title="Facebook"><i className="fab fa-facebook-f"></i></Link></li>
                  <li><Link href="#" className="icoTwitter" title="Twitter"><i className="fab fa-twitter"></i></Link></li>
                  <li><Link href="#" className="icoGoogle" title="Google +"><i className="fab fa-google-plus"></i></Link></li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;