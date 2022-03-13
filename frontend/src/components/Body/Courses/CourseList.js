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
          <table className="table">
            <thead>
              <tr>
                <th>Number</th>
                <th>Session Title</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>Number</th>
                <th>Session Title</th>
              </tr>
            </tfoot>
            <tbody>
            {props.courses.map((course, i) => {
              return (
                <tr>
                  <th key={course.courseId}>{i + 1}</th>
                  <td>
                    <p key={course.courseId} onClick={() => handleCourse(course.title)}>{course.title}</p>
                  </td>
                </tr>
              );
            })}
            </tbody>
          </table>
        }
        {selected &&
          <IndividualCourse course={course} setSelected={setSelected} userName = {props.userName}
          userType = {props.userType}/>
  
        }
  
      </div>
    );
  }

export default Courseslist;