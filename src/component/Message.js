import '../App.css';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBIcon,
  MDBTextArea,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from 'react';
import api, {getConfig} from './api';
import socket from './socket';

function Message(props) {
//   const [isOnline, setIsOnline] = useState(null);
const [messages, setMessages] = useState([]);
const [channel, setChannel] = useState(1);
const [loginUser, setLoginUser] = useState(JSON.parse(localStorage.getItem('authData'))?.data?.user);
const [typing, setTyping] = useState({});

  useEffect(() => {
    let config = getConfig(JSON.parse(localStorage.getItem('authData')).data.access_token);
    api.get(`/messages/${channel}`, config).then(
        response => {
          let messageData = response.data?.data?.data;
          console.log(messageData);
            if(messageData.length)
            {
                setMessages(messageData);
            }
          
        }
    ) 
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 1000);
  }, []);


  window.Echo.connect();
  window.Echo.private(`user.${loginUser?.id}`)
  .listen('MessageCreated', (response) => {
    console.log(messages);
    setMessages([...messages, response.message]);
  })
  
  window.Echo.private(`chat`)
  .listenForWhisper(`typing_${channel}`, response => setTyping(response));


  

  const renderListMessage = () => {
    if(messages.length) {
      return messages.map((message, key) => {
        if (message.user_id == loginUser.id) {
          return (
            <div key={key} className="d-flex flex-row justify-content-end mb-4">
              <div className="p-3 me-3 border" style={{borderRadius: "15px", backgroundColor: "#fbfbfb"}}>
                <p className="small mb-0">{message.content}</p>
                <div className="bg-image">
                     {message.image && (
                        <img src={message.image}
                        style={{borderRadius: "15px"}} alt="video"/>
                      )}
                      <a href="#!">
                        <div className="mask"></div>
                      </a>
                    </div>
              </div>
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                alt="avatar 1" style={{width: "45px", height: "100%"}} />
            </div>
          )
        } else {
          return (
            <div key={key} className="d-flex flex-row justify-content-start mb-4">
                <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%" }}
                />
                <div
                    className="p-3 ms-3"
                    style={{
                    borderRadius: "15px",
                    backgroundColor: "rgba(57, 192, 237,.2)",
                    }}
                >
                    <p className="small mb-0">
                    {message.content}
                    </p>
                    <div className="bg-image">
                      {message.image && (
                        <img src={message.image}
                        style={{borderRadius: "15px"}} alt="video"/>
                      )}
                      
                      <a href="#!">
                        <div className="mask"></div>
                      </a>
                    </div>
                </div>      
            </div>
          )
        }
      })
    }
  }

  const sendMessage = (e) => {
    if (e.which == 13 && !e.shiftKey) {
        e.preventDefault();
        let config = getConfig(JSON.parse(localStorage.getItem('authData')).data.access_token);
        api.post('/messages', {
            content: e.target.value,
            channel: 1   
        }, config).then(response => {})
        e.target.value = '';
    }
  }

  const typingMessage = (e) => {
    if(e.target.value.length) {
      window.Echo.private('chat')
      .whisper(`typing_${channel}`, {
        username: loginUser.name,
        user_id: loginUser.id,
        is_typing: true
      })
    } else {
      window.Echo.private('chat')
      .whisper(`typing_${channel}`, {
        username: loginUser.name,
        user_id: loginUser.id,
        is_typing: false
      })
    }
  }

  return (
    <MDBContainer className="py-5">
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="8" lg="6" xl="4">
          <MDBCard id="chat1" style={{ borderRadius: "15px" }}>
            <MDBCardHeader
              className="d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
              style={{
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
              }}
            >
              <MDBIcon fas icon="angle-left" />
              <p className="mb-0 fw-bold">Live chat</p>
              <MDBIcon fas icon="times" />
            </MDBCardHeader>
              
            <MDBCardBody>
                {renderListMessage()}
              {/* <div className="d-flex flex-row justify-content-start mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%" }}
                />
                <div
                  className="p-3 ms-3"
                  style={{
                    borderRadius: "15px",
                    backgroundColor: "rgba(57, 192, 237,.2)",
                  }}
                >
                  <p className="small mb-0">
                    Hello and thank you for visiting MDBootstrap. Please click
                    the video below.
                  </p>
                </div>
              </div> */}

              {/* <div className="d-flex flex-row justify-content-end mb-4">
                <div
                  className="p-3 me-3 border"
                  style={{ borderRadius: "15px", backgroundColor: "#fbfbfb" }}
                >
                  <p className="small mb-0">
                    Thank you, I really like your product.
                  </p>
                </div>
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%" }}
                />
              </div> */}

              {/* <div className="d-flex flex-row justify-content-start mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%" }}
                />
                <div className="ms-3" style={{ borderRadius: "15px" }}>
                  <div className="bg-image">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/screenshot1.webp"
                      style={{ borderRadius: "15px" }}
                      alt="video"
                    />
                    <a href="#!">
                      <div className="mask"></div>
                    </a>
                  </div>
                </div>
              </div> */}

              {/* <div className="d-flex flex-row justify-content-start mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%" }}
                />
                <div
                  className="p-3 ms-3"
                  style={{
                    borderRadius: "15px",
                    backgroundColor: "rgba(57, 192, 237,.2)",
                  }}
                >
                  <p className="small mb-0">...</p>
                </div>
              </div> */}
              {typing 
              && typing.is_typing 
              && loginUser.id !== typing.user_id 
              && (
                <div className="doctor-typing flex ml-2">
                  <img
                    src={process.env.PUBLIC_URL + '/Message/img/typing_message.svg'}
                  />
                </div>

              )}
              
              <MDBTextArea
                className="form-outline"
                label="Type your message"
                id="textAreaExample"
                rows={4}
                onKeyPress={sendMessage}
                onKeyUp={typingMessage}
              />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Message;