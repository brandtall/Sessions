import { createRef } from "react";
const Video = (props) => {
    const videoSrc = createRef();
    const getUserVideo = async () => {
      videoSrc.current.onloadedmetadata = (e) => {
        videoSrc.current.play();
      }
    }
    const getUserAudio = async () => {
      return (await navigator.mediaDevices.getUserMedia({audio: true}));
    }
    const getUserScreen = async () => {
      videoSrc.current.srcObject = await navigator.mediaDevices.getDisplayMedia({video: true});
    }
    return (
      <div>
        <video ref = {videoSrc} autoplay playsinline controls="false"/>
        <button onClick={() => getUserVideo()}>Open Camera</button>
        <button onClick={() => getUserAudio()}>Open Audio</button>
        <button onClick={() => getUserScreen()}>Share Screen</button>
  
      </div>
    );
  }

  export default Video;