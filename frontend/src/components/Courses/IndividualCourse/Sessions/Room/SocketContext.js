import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import Call from './Call';
const SocketContext = (props) => {
  const [socket, setSocket] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [socketId, setSocketId] = useState("");
  const [peerId, setPeerId] = useState(null);
  const [recievedCall, setRecivedCall] = useState(false);
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
    newSocket.on("id", (arg) => setSocketId(arg.socketId));
    const newPeerCon = (new RTCPeerConnection(servers))
    setPeerConnection(newPeerCon);
    return () => newSocket.disconnect();
  }, []);

  const getVideos = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStream.getTracks().forEach(track => {
      peerConnection.addTrack(track, localStream);
    });
  }
  const makeCall = async () => {
    socket.on('answerCall', async message => {
      if (message.answer) {
        const remoteDesc = new RTCSessionDescription(message.answer);
        await peerConnection.setRemoteDescription(remoteDesc);
      }
    });
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit("makeCall", { 'offer': offer, 'from': socketId });
  }
  const answerCall = () => {
    socket.on('makeCall', async message => {
      if (message.offer) {
        setPeerId(message.from);
        peerConnection.setRemoteDescription(new RTCSessionDescription(message.offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        setRecivedCall(true);
        socket.emit("answerCall", { 'answer': answer, 'to': peerId });
      }
    });
  }
    const changeIceCandidates = () => {
      peerConnection.addEventListener("icecandidate", (event) => {
        if (event.candidate) {
          console.log("Three")
          socket.emit("new-ice-candidate", { "newicecandidate": event.candidate });
        }
      });
      socket.on("new-ice-candidate", async (arg) => {
        console.log("One")
        if (arg.newicecandidate) {
          console.log("Two");
          try {
            await peerConnection.addIceCandidate(arg.newicecandidate);
          } catch (err) {
            console.error(err);
          }
        }
      });
      peerConnection.addEventListener("connectionstatechange", (event) => {
        if (peerConnection.connectionState === 'connected') {
          console.log("connected");
        }
      });
    }
  return (
    <div>
      {peerConnection && socket ? <Call makeCall={makeCall} answerCall={answerCall} recievedCall={recievedCall} socket={socket}
        peerConnection={peerConnection} getVideos={getVideos} changeIceCandidates={changeIceCandidates} /> : <div></div>}
    </div>
  );
}

export default SocketContext;