const Message = (props) => {
    props.socket.on("response", (data) => props.setResponse(props.response.concat(data)));
    return (
        <div>
            {props.response.map((e, index) => {
                return (
                    <p key={index}>{e}</p>
                );
            })}
        </div>
    );
}

export default Message;