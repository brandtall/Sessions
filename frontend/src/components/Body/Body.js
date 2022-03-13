import LogInForm from "../Login/LoginForm";
import Courseslist from "./Courses/CourseList";
import axios from 'axios';
import { useState, useEffect } from "react";

const Body = () => {
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userType, setUserType] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [courses, setCourses] = useState([]);  
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
        setUserName(response.data.user.name);
        setUserType(response.data.user.userType);
        setCourses(response.data.courses);
        setLoggedIn(true);
      }
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
          <Courseslist courses={courses} setLoggedIn={setLoggedIn}
            userName = {userName} userType = {userType}/>
        }
      </div>
    );
}
export default Body;