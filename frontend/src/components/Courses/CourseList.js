import { useState } from "react";
import IndividualCourse from "./IndividualCourse/IndividualCourse";

const Courseslist = (props) => {
    const [course, setCourse] = useState({});
    const [selected, setSelected] = useState(false);
    const handleCourse = (c) => {
      const selectedCourse = props.courses.find((cs) => cs.title === c);
      setCourse(selectedCourse);
      setSelected(true);
  
    }
    return (
      <div>
        {!selected &&
          <div>
            {props.courses.map((course) => {
              return (
                <p key={course.courseId} onClick={() => handleCourse(course.title)}>{course.title}</p>
              );
            })}
            <button onClick={() => props.setLoggedIn(false)} >Log out</button>
          </div>
        }
        {selected &&
          <IndividualCourse course={course} setSelected={props.setSelected} userName = {props.userName}
          userType = {props.userType}/>
  
        }
  
      </div>
    );
  }

export default Courseslist;