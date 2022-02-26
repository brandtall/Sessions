import { createRef, useEffect } from "react"


const UserVideo = (props) => {
    const localVideo = createRef();
    useEffect(() => {
        localVideo.current.srcObject = props.myStream;
        // localVideo.current.onloadedmetadata = (e) => {
        //     localVideo.current.play();
        //   }
    }, [])
    return (
        <div>
            <video ref={localVideo} autoPlay playsInline controls={false}/>
            <p>Inside UserVideo</p>
        </div>
    );
}

export default UserVideo;