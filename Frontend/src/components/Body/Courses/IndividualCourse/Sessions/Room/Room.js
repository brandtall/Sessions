import { useState, useEffect } from "react";
import Message from "./Chat/Message";
import MessageInput from "./Chat/MessageInput";
import Video from "./Video/Video";
import { Socket as socketIOClient } from "socket.io-client";

const Room = (props) => {
    const [response, setResponse] = useState([])
    const [message, setMessage] = useState("");
    const [socket, setSocket] = useState(null);
    useEffect(() => {
      let newSocket = new socketIOClient("http://localhost:3003", {withCredentials: true});
      setSocket(newSocket);
      return () => newSocket.disconnect();
    }, []);
    
    
    return (
      <div>
        Inside sessions {props.session.title} with ID: {props.session.sessionId}
        {socket ? 
        <div>
          <Message socket = {socket} message = {message} setMessage = {setMessage} response = {response} setResponse = {setResponse}
          /> 
          <MessageInput socket = {props.socket} message = {message} setMessage = {setMessage} response = {response} setResponse = {setResponse}
          userName = {props.userName} />
          <Video ref = {props.videoSrc} /> 
        </div>
        : <p>No Socket Connection Yet...</p>}
      </div>
    );
  }
  export default Room;