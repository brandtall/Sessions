import { createRef, useEffect, useState } from "react";

const RemoteVideos = (props) => {
    const [remoteVideosList, setremoteVideosList] = useState([]);
    
    useEffect(() => {
        updateStreams();
    }, [])

    useEffect(() => {
        showPeers();
    }, [props.remoteStream])


    const updateStreams = () => {
        const updatedRemoteStreams = [];
        Object.keys(props.peer.connections).forEach((e) => {
            updatedRemoteStreams.push(props.peer.connections[e][0]._remoteStream);
            setremoteVideosList([...RemoteVideos, createRef()])
        });
        props.setRemoteStream([...updatedRemoteStreams]);
    }
    const showPeers = () => {
        props.remoteStream.forEach((e) => {
            const newRemoteVideo = createRef();
            newRemoteVideo.current.srcObject = e;
        })
    }


    return (
        <div>
            {remoteVideosList.map((rv) => {
                return (
                    <video ref={rv} autoPlay playsInline controls={false} />
                );
            })}
        </div>
    );
}

export default RemoteVideos;