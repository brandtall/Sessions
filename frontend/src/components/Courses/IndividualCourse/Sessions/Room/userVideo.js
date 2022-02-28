import { createRef, useEffect, useState } from "react"


const UserVideo = (props) => {
    const [myVideo, setMyVideo] = useState(false);
    const [myAudio, setMyAudio] = useState(false);
    const [myScreen, setMyScreen] = useState(false);
    const localVideo = createRef();

    useEffect(() => {
        localVideo.current.srcObject = props.myStream;
    }, []);
    useEffect(() => {
        props.myStream.getAudioTracks()[0].enabled = myAudio;
        props.myStream.getVideoTracks()[0].enabled = myVideo;
    }, [myVideo, myAudio]);
    useEffect(() => {
        if (myScreen) {
            navigator.mediaDevices.getDisplayMedia({ video: true }).then((stream) => {
                Object.keys(props.peer.connections).forEach(async (e) => {
                    await props.peer.connections[e][0].peerConnection.getSenders()[0].replaceTrack(stream.getTracks()[0]);
                    console.log(props.peer.connections[e][0].peerConnection.getSenders()[0]);
                })
            })
        }
    }, [myScreen])

    const handleVideo = () => {
        setMyScreen(false);
        setMyVideo(!myVideo);
    }

    const handleAudio = () => {
        setMyAudio(!myAudio);
    }

    const handleShareScreen = () => {
        setMyVideo(false);
        setMyScreen(!myScreen);
    }

    return (
        <div>
            <video ref={localVideo} autoPlay playsInline controls={false} />
            <button onClick={handleVideo}>Open Camera</button>
            <button onClick={handleAudio}>Open Audio</button>
            <button onClick={handleShareScreen}>Share Screen</button>
        </div>
    );
}

export default UserVideo;