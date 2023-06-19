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
import api from './api';

function Message(props) {
//   const [isOnline, setIsOnline] = useState(null);
const [messages, setMessages] = useState([]);
const [channel, setChannel] = useState(1);
  useEffect(() => {
    api.get('/messages').then(
        response => {
            if(response.data.length)
            {
                setMessages(response.data);
            }
        }
    )
  },[]);

  // window.Echo.channel('laravel_database_chatChannel')
  //   .listen('.MessageCreated', (response) => {
  //     setMessages([...messages, response.message]);
  //   })
  //   .listen('typing', response => console.log(response));

  const renderListMessage = () => {
    if(messages.length) {
      return messages.map((message, key) => {
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
                </div>
            </div>
        )
      })
    }
  }

  const sendMessage = (e) => {
    var key = e.keyCode;
    if (e.which == 13 && !e.shiftKey) {
        e.preventDefault();
        api.post('/messages', {
            content: e.target.value
        }).then(response => console.log( response ))
        e.target.value = '';
    }
  }

  const typingMessage = (e) => {
    // if(e.target.value.length) {
    //   window.Echo.channel('laravel_database_chatChannel')
    //   .whisper('typing', {
    //     username: 'Phu123'
    //   })
    // }
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