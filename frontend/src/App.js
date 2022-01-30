import { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';



const Documents = (props) => {
  return (
    <div>
      <h1>Course Documents My Dudes</h1>
      <button onClick={() => props.setTab(0)}>Back</button>
    </div>
  );
}

const Room = (props) => {
  const [response, setResponse] = useState("");
  useEffect(() => {
    const socket = socketIOClient("http://localhost:3005");
    socket.on("FromAPI", data => {
      setResponse(data);
    })
    return () => socket.disconnect();
  }, []);
  return (
    <div>
      Inside sessions {props.session.title} with ID: {props.session._id} with Response: {response}
    </div>
  );
}

const Session = (props) => {
  const [sessionForm, setSessionForm] = useState("none");
  const [sessionTitle, setSessionTitle] = useState("");
  const [sessionDuration, setSessionDuration] = useState(0);
  const [selectedSession, setSelectedSession] = useState(false);
  const [session, setSession] = useState(null);
  const handleSessionForm = () => {
    return sessionForm === "none" ? setSessionForm("block") : setSessionForm("none")
  }
  const handleSessionCreation = async (e) => {
    e.preventDefault();
    const sessionId = uuidv4();
    const results = await axios.post('http://localhost:3003/session', {
      sessionId,
      title: sessionTitle,
      duration: sessionDuration,
      course: props.courseId,
      instructor: props.userId
    });
  }
  const handleSessionTitle = (event) => {
    setSessionTitle(event.target.value);
  }
  const handleSessionDuration = (event) => {
    setSessionDuration(event.target.value);
  }
  const handleSessionJoin = (s) => {
    const userSelectedSession = props.sessions.find((session) => session.title === s);
    setSession(userSelectedSession);
    setSelectedSession(true);
  }
  return (
    <div>
      {selectedSession ?
        <div>
          <Room session = {session} />
        </div>
        :
        <div>
          <h1>Session My Friend</h1>
          <div>
            {props.sessions.map((session) => {
              return (
                <p key={session.id} onClick={() => handleSessionJoin(session.title)}>{session.title}</p>
              );
            })}
          </div>
          <button onClick={() => props.setTab(0)}>Back</button>
          <button onClick={handleSessionForm}>Toggle Form</button>
          <form style={{ display: sessionForm }} onSubmit={handleSessionCreation}>
            <label>
              Session title:
              <input type="text" value={sessionTitle} onChange={handleSessionTitle} required />
            </label>
            <label>
              Session Duration:
              <input type="number" value={sessionDuration} onChange={handleSessionDuration} required />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      }
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
          <button onClick={() => props.setTab(1)}>Course Documents</button> <br />
          <button onClick={() => props.setTab(2)}>View all sessions</button> <br />
          <button onClick={() => props.setSelected(false)}>Back</button>
        </div> : props.tab === 1 ?
          <div>
            <Documents setTab={props.setTab} />
          </div>
          : props.tab === 2 ?
            <div>
              <Session setTab={props.setTab} sessions={props.sessions} setSessions={props.setSessions} courseId={props.course.courseId} userId={props.userId} />
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
        <IndividualCourse course={props.course} setSelected={props.setSelected} tab={props.tab} setTab={props.setTab}
          sessions={props.sessions} setSessions={props.setSessions} />

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
  const [sessions, setSessions] = useState([{ title: "Hello", id: 123 }, { title: "He", id: 121 }, { title: "Heo", id: 122 }]);

  useEffect(() => {
    // Token Admistration
    return () => {
    }
  }, [])

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
          setSelected={setSelected} tab={tab} setTab={setTab} sessions={sessions} setSessions={setSessions} />
      }
    </div>
  );
}

export default App;
