import { useEffect } from "react"
const Call = (props) => {
    useEffect(() => {
        if(props.socketId) {
            if (!props.callEstablished) {
                props.answerCall();
                if (!props.recievedCall) {
                    props.makeCall();
                }
            }
            else {
                props.changeIceCandidates();
            }
        }
    }, [props.recievedCall, props.callEstablished, props.socketId]);
    return (
        <div>
            Call on
        </div>
    );
}
export default Call;