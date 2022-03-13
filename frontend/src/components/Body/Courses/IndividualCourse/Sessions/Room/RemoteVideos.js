import {useEffect, useRef } from "react";

const RemoteVideos = (props) => {
    const videosRef = useRef([]);
    useEffect(() => {
        props.remoteStream.forEach((e, i) => {
            if(i < 2) {
                videosRef.current[i].srcObject = e;
            }
        });
    }, [props.remoteStream]);

    return (
        <div className="columns">
            {props.remoteStream.map((e, i) => {
                return (
                    <video className="column is-half" key = {i} ref={(el) => videosRef.current[i] = el} autoPlay playsInline controls={false} />
                );
                })}
                {props.remoteStream.length > 2 ? <h1>+{props.remoteStream.length - 2}</h1> : <span></span>}
        </div>
    );
}

export default RemoteVideos;