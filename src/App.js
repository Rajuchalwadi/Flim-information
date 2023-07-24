import Header from "./component/Header";
import Card from "./component/Card";
import Addmovie from "./component/Addmovie";
import {Routes , Route} from 'react-router-dom';
import Details from "./component/Details";
import { createContext , useState} from "react";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Requestotp from "./component/Requestotp";

const Appstate = createContext();
function App() {

  const [login , setLogin] = useState("")
  const [usename , setUserName] = useState("")
  return (
    <>
    <Appstate.Provider value={{login,usename,setLogin,setUserName}}> 
      <div className="app relative">
      <Header />;
      <Routes>
        <Route path="/" element={<Card/>}/>
        <Route path="/add" element={<Addmovie/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/request" element={<Requestotp/>}/>
        <Route path="/details/:id" element={<Details/>}/>
      </Routes>
      </div>
      </Appstate.Provider>
      
    </>
  );
}

export default App;
export  {Appstate};