import { useEffect } from "react"
const Call = (props) => {
    useEffect(() => {
        props.socket.emit("initCall", {"from": props.socketId, 'peerId': props.socketId});
        props.socket.on("callRequest", (arg) => {
            props.makeCall(arg);
        });
        props.socket.on("makeCall", () => {
            console.log("Hello");
            props.answerCall();
        });
    }, []);
    return (
        <div>
            Call on
        </div>
    );
}
export default Call;