import { useEffect } from "react"
const Call = (props) => {
    useEffect (() => {
        props.getVideos();
        props.answerCall()
        if(!props.recievedCall) {
            props.makeCall();
        }
        props.changeIceCandidates();
    }, []);
    return (
        <div>
            Call on
        </div>
    );
}
export default Call;