import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import Call from './Call';
const SocketContext = (props) => {
  const [socket, setSocket] = useState(null);
  const [peerConnection, setPeerConnection] = useState({});
  const [socketId, setSocketId] = useState("");
  const [peerId, setPeerId] = useState(null);
  const [recievedCall, setRecivedCall] = useState(false);
  const [tracksAdded, setTracksAdded] = useState(false);
  const [callEstablished, setCallEstablished] = useState(false);
  const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ], // free STUN servers provided by Google
      },
    ],
    iceCandidatePoolSize: 10,
  };
  useEffect(() => {
    const newSocket = socketIOClient("http://localhost:3003", { withCredentials: true });
    setSocket(newSocket);
    newSocket.on("connect", () => setSocketId(newSocket.id));
    return () => newSocket.disconnect();
  }, []);

  const getVideos = async (pc) => {
    const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStream.getTracks().forEach(track => {
      pc.addTrack(track, localStream);
    });
    setTracksAdded(true);
  }
  const makeCall = async () => {
      const newPeerCon = new RTCPeerConnection(servers);
      socket.on('answerCall', async message => {
        if (message.answer) {
          setPeerId(message.from);
          const newPeerArray = peerConnection;
          newPeerArray[message.from] = newPeerCon;
          const remoteDesc = new RTCSessionDescription(message.answer);
          await newPeerArray[message.from].setRemoteDescription(remoteDesc);
          console.log(newPeerArray[message.from]);
          setPeerConnection({ ...peerConnection, ...newPeerArray});
          setCallEstablished(true);
        }
      });
      getVideos(newPeerCon);
      const offer = await newPeerCon.createOffer();
      await newPeerCon.setLocalDescription(offer);
      socket.emit("makeCall", { 'offer': offer, 'from': socketId });
  }
  const answerCall = () => {
      const newPeerCon = new RTCPeerConnection(servers);
      socket.on('makeCall', async message => {
        if (message.offer) { 
          setPeerId(message.from);
          const newPeerArray = {};
          newPeerArray[message.from] = newPeerCon;
          newPeerArray[message.from].setRemoteDescription(new RTCSessionDescription(message.offer));
          const answer = await newPeerArray[message.from].createAnswer();
          console.log(answer);
          await newPeerArray[message.from].setLocalDescription(answer);
          console.log(newPeerArray)
          setRecivedCall(true);
          setPeerConnection({...peerConnection, ...newPeerArray});
          setCallEstablished(true);
          socket.emit("answerCall", { 'answer': answer, 'to': message.from, 'from': socketId });
        }
      });
  }
  const changeIceCandidates = () => {
    console.log(peerConnection[peerId]);
    if(!peerConnection[peerId]) {
      console.log("Hello");
    } else {
      console.log("Hi");
      peerConnection[peerId].addEventListener("icecandidate", (event) => {
      if (event.candidate) {
        console.log("Three")
        socket.emit("new-ice-candidate", { "newicecandidate": event.candidate, to: peerId });
      }
    });
    socket.on("new-ice-candidate", async (arg) => {
      console.log("One")
      if (arg.newicecandidate) {
        console.log("Two");
        try {
          await peerConnection[peerId].addIceCandidate(arg.newicecandidate);
        } catch (err) {
          console.error(err);
        }
      }
    });
    peerConnection[peerId].addEventListener("connectionstatechange", (event) => {
      if (peerConnection[peerId].connectionState === 'connected') {
        console.log("connected");
      }
    });
  }
  }
  return (
    <div>
      {peerConnection && socket ? <Call makeCall={makeCall} answerCall={answerCall} recievedCall={recievedCall} socket={socket}
        peerConnection={peerConnection} getVideos={getVideos} changeIceCandidates={changeIceCandidates} tracksAdded={tracksAdded} 
        callEstablished = {callEstablished} socketId = {socketId}/> : <div></div>}
    </div>
  );
}

export default SocketContext;