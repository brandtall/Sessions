import { useState } from 'react';
import axios from 'axios';



const Documents = (props) => {
  return (
    <div>
      <h1>Course Documents My Dudes</h1>
      <button onClick={() => props.setTab(0)}>Back</button>
    </div>
  );
}

const Session = (props) => {
  return (
    <div>
      <h1>Session My Friend</h1>
      <button onClick={() => props.setTab(0)}>Back</button>
    </div>
  );
}

const IndividualCourse = (props) => {
  return (
    <div>
      {props.tab === 0 ? 
        <div>
          <p>CRN:{props.course.courseId}</p>
          <p>Title: {props.course.title}</p>
          <p>Section: {props.course.section}</p>
          <button onClick = {() => props.setTab(1)}>Course Documents</button> <br/>
          <button onClick = {() => props.setTab(2)}>View all sessions</button> <br/>
          <button onClick={() => props.setSelected(false)}>Back</button>
        </div> : props.tab === 1 ?
        <div>
          <Documents setTab = {props.setTab}/>
        </div>
        : props.tab === 2 ?
        <div>
          <Session setTab = {props.setTab} />
        </div>
        : null}
    </div>
  );
}

const Courseslist = (props) => {
  return (
    <div>
      {!props.selected &&
        <div>
          {props.courses.map((course) => {
            return (
              <p key={course.courseId} onClick={() => props.handleCourse(course.title)}>{course.title}</p>
            );
          })}
          <button onClick={() => props.setLoggedIn(false)} >Log out</button>
        </div>
      }
      {props.selected &&
        <IndividualCourse course = {props.course} setSelected = {props.setSelected} tab = {props.tab} setTab = {props.setTab}/>

      }

    </div>
  );
}

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

const App = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState({});
  const [selected, setSelected] = useState(false);
  const [tab, setTab] = useState(0);

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
    if (response.status === 200) {
      setCourses(response.data.courses);
      setLoggedIn(true);
    }
    console.log(response.data, loggedIn);
  }

  const handleCourse = (c) => {
    const selectedCourse = courses.find((cs) => cs.title === c);
    setCourse(selectedCourse);
    setSelected(true);

  }

  return (
    <div className='App'>
      {
        !loggedIn &&
        <LogInForm userId={userId} password={password} setUserId={setUserId} setPassword={setPassword} handleSubmit={handleSubmit}
          handleUserId={handleUserId} handlePassword={handlePassword} />
      }
      {
        loggedIn &&
        <Courseslist courses={courses} handleCourse={handleCourse} setLoggedIn={setLoggedIn} selected={selected} course={course}
          setSelected={setSelected} tab = {tab} setTab = {setTab}/>
      }
    </div>
  );
}

export default App;
