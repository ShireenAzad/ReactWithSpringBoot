import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import EmployeeComponent from './components/EmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import AddEmployeeComponent from './components/AddEmployeeComponent';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';
import Employee from './components/Employee'
function App() {
   
  return (
    <div >
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Routes> 
                          <Route path = "/" exact element= {<EmployeeComponent/>}></Route>
                          <Route path = "/add" element = {<AddEmployeeComponent/>}></Route>
                          <Route path="/edit/:id" element={<UpdateEmployeeComponent/>}></Route>
                          <Route exact path="/:id" element={<Employee/>} ></Route>
                        
                    </Routes>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}
export default App;