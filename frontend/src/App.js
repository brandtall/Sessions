import { useState } from 'react';
import axios from 'axios';

function App() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [courses, setCourses] = useState([]);

  const handleUserId = (event) => {
    setUserId(event.target.value);
  }

  const handlePassword = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post('http://localhost:3003/login', {
      userId,
      password
    });
    if(response.status === 200) {
      setCourses(courses.concat(response.data.courses));
      setLoggedIn(true);
      console.log(courses && courses[0])
    }
    console.log(response.data, loggedIn);
  }

  return (
    <div className='App'>
      {
        !loggedIn && 
        <div>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
          User ID: <input type='text' value={userId} onChange={handleUserId}></input> <br/>
          Password: <input type='password' value={password} onChange={handlePassword}></input> <br/>
          <button type='submit'>Log In</button>
          </form>
        </div>
      }
      {
        loggedIn &&
        <div>
          { courses && courses.map((course) => {
            return (
              <p key = {course.courseId}>{course}</p>
            );
          })}
          <button onClick = {() => setLoggedIn(false)} >Log out</button>
        </div>
      }
    </div>
  );
}

export default App;
