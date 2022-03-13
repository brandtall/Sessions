const Message = (props) => {
    props.socket.on("response", (data) => props.setResponse(props.response.concat(data)));
    return (
        <div className="box">
            {props.response.map((e, index) => {
                return (
                    <p key={index}>{e}</p>
                );
            })}
        </div>
    );
}

export default Message;