const MessageInput = (props) => {
    const handleMessageChange = (event) => {
      props.setMessage(event.target.value);
    }
    const handleMessageSubmit = (event) => {
      event.preventDefault();
      props.socket.emit("message", props.userName + ": " + props.message);
      props.setMessage("");
    }
    return (
      <div>
        <form onSubmit={handleMessageSubmit}>
          <label>
            message:
            <input value={props.message} type="text" placeholder='type message here' onChange={handleMessageChange}/>
          </label>
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }

export default MessageInput;