const LogInForm = (props) => {
    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={props.handleSubmit}>
          User ID: <input className="input is-primary" type='text' value={props.userId} onChange={props.handleUserId}></input> <br />
          Password: <input className="input is-primary" type='password' value={props.password} onChange={props.handlePassword}></input> <br />
          <button type='submit'>Log In</button>
        </form>
      </div>
    );
  }
  export default LogInForm;