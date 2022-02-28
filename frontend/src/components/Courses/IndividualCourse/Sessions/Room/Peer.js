import Peer from 'peerjs';
import { useEffect, useState } from 'react';
import Socket from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import Call from './Call';
import Message from './Chat/Message';
import MessageInput from './Chat/MessageInput';
import RemoteVideos from './RemoteVideos';
import UserVideo from './userVideo';
let localId;

const PeerComponent = (props) => {
    const [remoteStream, setRemoteStream] = useState([]);
    const [myStream, setMyStream] = useState(null);
    const [socket, setSocket] = useState(null);
    const [myId, setMyId] = useState("");
    const [socketId, setSocketId] = useState("");
    const [peer, setPeer] = useState(null);
    const [response, setResponse] = useState([])
    const [message, setMessage] = useState("");
    useEffect(() => {
        let io = new Socket('http://localhost:3003', { withCredentials: true });
        io.on("connect", () => {
            setSocketId(io.id);
            localId = io.id;
            const localPeer = new Peer(localId);
            setPeer(localPeer);
        });
        setSocket(io);
        getVideo();
        return () => io.disconnect();
    }, []);

    const getVideo = async () => {
        const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setMyStream(localStream);
    }

    const makeCall = async (arg) => {
        const localCall = await peer.call(arg.peerId, myStream);
        localCall.on("stream", (stream) => {
            setRemoteStream((prevArray) => {
                const newArray = prevArray.filter((e) => e.id !== stream.id);
                return [...newArray, stream];

            }
            );
        });
        socket.on("closeCall", (arg) => {
            setRemoteStream((prevArray) => {
                const newArray = prevArray.filter((e, i) => e.id !== peer.connections[arg][0]._remoteStream.id);
                return [...newArray];
            });
        });
        peer.on("close", () => {
            peer.destroy();
        })
        socket.emit("makeCall", { "to": arg.from });
    }
    const answerCall = async () => {
        peer.on("call", (call) => {
            const answer = call.answer(myStream);
            call.on("stream", (stream) => {
                setRemoteStream((prevArray) => {
                    const newArray = prevArray.filter((e) => e.id !== stream.id);
                    return [...newArray, stream];
                }
                );
            });
            socket.on("closeCall", (arg) => {
                setRemoteStream((prevArray) => {
                    const newArray = prevArray.filter((e, i) => e.id === peer.connections[arg][0]._remoteStream.id);
                    return [...newArray];
                });
            });
            peer.on("close", () => {
                peer.destroy();
            })
        });
    }
    return (
        <div>
            {socket && myStream && peer && socketId ?
                <div>
                    <Call socket={socket} peer={peer} socketId={socketId} makeCall={makeCall} answerCall={answerCall} />
                    <UserVideo myStream={myStream} />
                    {remoteStream ? <RemoteVideos remoteStream={remoteStream} peer={peer} remoteStream={remoteStream} setRemoteStream={setRemoteStream} />
                        : <div></div>}
                </div>
                : <div></div>}
            {socket ?
                <div>
                    <Message socket={socket} message={message} setMessage={setMessage} response={response} setResponse={setResponse}
                    />
                    <MessageInput socket={socket} message={message} setMessage={setMessage} response={response} setResponse={setResponse}
                        userName={props.userName} />
                </div>
                : <p>No Socket Connection Yet...</p>}
        </div>
    )
}

export default PeerComponent;