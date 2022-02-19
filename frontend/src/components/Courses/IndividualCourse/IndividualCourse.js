import { useState } from "react";
import Documents from "./Documents/Documents";
import Session from "./Sessions/Sessions";

const IndividualCourse = (props) => {
  const [tab, setTab] = useState(0);
    return (
      <div>
        {tab === 0 ?
          <div>
            <p>CRN:{props.course.courseId}</p>
            <p>Title: {props.course.title}</p>
            <p>Section: {props.course.section}</p>
            <button onClick={() => setTab(1)}>Course Documents</button> <br />
            <button onClick={() => setTab(2)}>View all sessions</button> <br />
            <button onClick={() => props.setSelected(false)}>Back</button>
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