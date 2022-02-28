import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 }  from "uuid";
import Room from "./Room/Room";
import SocketContext from "./Room/SocketContext";
import PeerComponent from './Room/Peer';

const Session = (props) => {
    const [sessionForm, setSessionForm] = useState("none");
    const [sessionTitle, setSessionTitle] = useState("");
    const [sessionDuration, setSessionDuration] = useState(0);
    const [selectedSession, setSelectedSession] = useState(false);
    const [session, setSession] = useState(null);
    const [sessionsList, setSessionsList] = useState([]);
  
  
    useEffect(() => {
      setSessionsList([]);
      const getSessions = async () => {
        const sessions = await axios.get('http://localhost:3003/session');
        setSessionsList(sessionsList.concat(sessions.data));
      }
      getSessions();
    }, []);
    const handleSessionForm = () => {
      return sessionForm === "none" ? setSessionForm("block") : setSessionForm("none")
    }
    const handleSessionCreation = async (e) => {
      e.preventDefault();
      const sessionId = uuidv4();
      await axios.post('http://localhost:3003/session', {
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
      const userSelectedSession = sessionsList.find((session) => session.sessionId === s);
      setSession(userSelectedSession);
      setSelectedSession(true);
    }
    return (
      <div>
        {selectedSession ?
          <div>
            <PeerComponent userName = {props.userName} />
          </div>
          :
          <div>
            <h1>Session My Friend</h1>
            <div>
              {sessionsList !== [] ? 
              sessionsList.map((s) => {
                return (
                  <p key={s.sessionId} onClick={() => handleSessionJoin(s.sessionId)}>{s.title}</p>
                );
              })
            : <div></div> }
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
export default Session;  