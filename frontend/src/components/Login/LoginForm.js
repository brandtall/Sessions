const LogInForm = (props) => {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={props.handleSubmit}>
          User ID: <input type='text' value={props.userId} onChange={props.handleUserId}></input> <br />
          Password: <input type='password' value={props.password} onChange={props.handlePassword}></input> <br />
          <button type='submit'>Log In</button>
        </form>
      </div>
    );
  }
  export default LogInForm;