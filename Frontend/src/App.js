import { useState, useEffect, createRef } from 'react';
import {v4 as uuidv4} from 'uuid';
import Header from "./components/Header/Header";
import Body from "./components/Body/Body";

const App = () => {
 return (
   <div>
     <Header />
     <Body />
   </div>
 );
}

export default App;
