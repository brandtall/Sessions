import {useEffect, useRef } from "react";

const RemoteVideos = (props) => {
    const videosRef = useRef([]);
    useEffect(() => {
        props.remoteStream.forEach((e, i) => {
            videosRef.current[i].srcObject = e;
        });
    }, [props.remoteStream]);

    return (
        <div>
            {props.remoteStream.map((e, i) => {
                return (
                    <video key = {i} ref={(el) => videosRef.current[i] = el} autoPlay playsInline controls={false} />
                );
            })}
        </div>
    );
}

export default RemoteVideos;