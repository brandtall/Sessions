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

    const handleVideo = () => {
        setMyScreen(false);
        setMyVideo(!myVideo);
    }

    const handleAudio = () => {
        setMyAudio(!myAudio);
    }

    return (
        <div className="columns">
            <table>
                <tr className="column is-quarter">
                    <video className="" ref={localVideo} autoPlay playsInline controls={false} />
                </tr>
                <tr className="buttons">
                        <button className="button is-info" onClick={handleVideo}>Open Camera</button>
                        <button className="button is-info" onClick={handleAudio}>Open Audio</button>
                </tr>    
            </table>
            
        </div>
    );
}

export default UserVideo;