import Peer from 'peerjs';
import { useEffect, useState } from 'react';
import Socket from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import Call from './Call';
import RemoteVideos from './RemoteVideos';
import UserVideo from './userVideo';
const localId = uuidv4();


const PeerComponent = () => {
    const [remoteStream, setRemoteStream] = useState([]);
    const [myStream, setMyStream] = useState(null);
    const [socket, setSocket] = useState(null);
    const [myId, setMyId] = useState("");
    const [socketId, setSocketId] = useState("");
    const [peer, setPeer] = useState(null);
    useEffect(() => {
        let io = new Socket('http://localhost:3003', { withCredentials: true });
        setSocket(io);
        setMyId(localId);
        const localPeer = new Peer(localId);
        setPeer(localPeer);
        getVideo();
        io.on("connect", () => {
            setSocketId(io.id);
        });
        return () => io.disconnect();
    }, []);

    // useEffect(() => {
    //     if(peer) {
    //         const updatedRemoteStreams = [];
    //         Object.keys(peer.connections).forEach((e) => {
    //             updatedRemoteStreams.push(peer.connections[e][0]._remoteStream);
    //         });
    //         setRemoteStream([...updatedRemoteStreams]);
    //     }
    // }, [peer])

    const getVideo = async () => {
        const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setMyStream(localStream);
    }

    const makeCall = async (arg) => {
        const localCall = await peer.call(arg.peerId, myStream);
        console.log(localCall);
        localCall.on("stream", (stream) => {
            // setRemoteStream([...remoteStream, stream]);
        });
        socket.emit("makeCall", { "to": arg.from });
    }
    const answerCall = async () => {
        peer.on("call", (call) => {
            const answer = call.answer(myStream);
            console.log("Answer")
            call.on("stream", (stream) => {
                // setRemoteStream([...remoteStream, stream]);
            });
            console.log(peer.connections);
        });
    }
    return (
        <div>
            {socket && myStream && peer && myId ?
                <div>
                    <Call socket={socket} myId={myId} peer={peer} socketId={socketId} makeCall={makeCall} answerCall={answerCall} />
                    <UserVideo myStream={myStream} />
                    <RemoteVideos remoteStream={remoteStream} peer={peer} remoteStream={remoteStream} setRemoteStream={setRemoteStream}/> 
                </div>
                : <div></div>}
        </div>
    )
}

export default PeerComponent;