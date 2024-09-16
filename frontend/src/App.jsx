import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import SignUp from "./SignUp.jsx";
import Dashboard from "./Dashboard.jsx";
import Send from "./Send.jsx";
import SignIn from "./SignIn.jsx";

function App() {

  return (


    <BrowserRouter>
        <Routes>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/send' element={<Send/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
