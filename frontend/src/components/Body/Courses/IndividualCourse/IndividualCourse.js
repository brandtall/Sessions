import { useState } from "react";
import Documents from "./Documents/Documents";
import Session from "./Sessions/Sessions";

const IndividualCourse = (props) => {
  const [tab, setTab] = useState(0);
    return (
      <div className="container">
        {tab === 0 ?
          <div className="card-content">
            <p>CRN:{props.course.courseId}</p>
            <p>Title: {props.course.title}</p>
            <p>Section: {props.course.section}</p>
            <div className="buttons">
            <button className="button is-info" onClick={() => setTab(1)}>Course Documents</button>
            <button className="button is-info" onClick={() => setTab(2)}>View all sessions</button>
            <button className="button is-info" onClick={() => props.setSelected(false)}>Back</button>
            </div>

          </div> : tab === 1 ?
            <div>
              <Documents setTab={setTab} />
            </div>
            : tab === 2 ?
              <div>
                <Session setTab={setTab} courseId={props.course.courseId} userId={props.userId} userName = {props.userName}
                userType = {props.userType}/>
              </div>
              : null}
      </div>
    );
  }

export default IndividualCourse;