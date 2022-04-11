import React, { useEffect, useState } from "react";
import { useHistory, useParams,Link } from "react-router-dom";

import * as employeeService from "../services/EmployeeService";
import "bootstrap/dist/css/bootstrap.min.css";
const UpdateEmployeeComponent = () => {
  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [everestEmailId, setEverestEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [personalEmailId, setPersonalEmailId] = useState("");
  const[addressLine1,setAddressLine1]=useState("");
  const[addressLine2,setAddressLine2]=useState("");
  const[city,setCity]=useState("");
  const[state,setState]=useState("");
 const[zipCode,setZipCode]=useState("");

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    everestEmailId: "",
    password: "",
    personalEmailId: "",
    presentAddress:"",
    permanentAddress:""
  });
  const[presentAddress,setPresentAddress]=useState({
    id:'',
    addressLine1:'',
    addressLine2:'',
    city:'',
    state:'',
    zipCode:''
   })
  
  
   const[permanentAddress,setPermanentAddress]=useState({
    id:'',
    addressLine1:'',
    addressLine2:'',
    city:'',
    state:'',
    zipCode:''
   })
  
  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    employeeService
      .updateEmployee(id, employee)
      .then((response) => {
        console.log("employee saved successfully", response);
        setFirstName("");
        setLastName("");
        setEverestEmailId("");
        setPassword("");
        setPersonalEmailId("");
        setPresentAddress(setAddressLine1(""),setAddressLine2(""),setCity(""),setState(""),setZipCode(""));
  
        setPermanentAddress(setAddressLine1(""),setAddressLine2(""),setCity(""),setState(""),setZipCode(""));
   
        
      })
      .catch((e) => console.log("error", e));
  };

  const loadUser = async () => {
    employeeService.getEmployeeById(id).then((response) => {
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setEverestEmailId(response.data.everestEmailId);
      setPassword(response.data.password);
      setPersonalEmailId(response.data.personalEmailId);
      setEmployee(response.data);
      setPresentAddress(setAddressLine1(response.data.presentAddress.addressLine1),
      setAddressLine2(response.data.presentAddress.addressLine2),
      setCity(response.data.presentAddress.city),
      setState(response.data.presentAddress.state),
      setZipCode(response.data.presentAddress.zipCode));
    
  
      setPermanentAddress(setAddressLine1(response.data.permanentAddress.addressLine1),
      setAddressLine2(response.data.permanentAddress.addressLine2),
      setCity(response.data.permanentAddress.city),
      setState(response.data.permanentAddress.state),
      setZipCode(response.data.permanentAddress.zipCode));
 
      console.log(response.data)
    }).catch((e) => console.log("error", e));
  };

  return (
    <div className="container">
      <h1>Employee Portal</h1>
      <hr />
      <Link className="btn btn-primary" to="/">
        back to Home
      </Link>
      
      <div id={"addEmployeeForm"}>
        <h2>Update Employee</h2>
        <form
          onSubmit={(e) => onSubmit(e)}
          className="row justify-content-center"
        >
          <div className="form-group col-md-5">
            <label htmlFor="firstName">FirstName</label>
            <input
              id="firstName"
              placeholder={"Enter the firstName"}
              className="form-control col-md-12"
              defaultValue={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group col-md-5">
            <label htmlFor="lastName">LastName</label>
            <input
              id="lastName"
              placeholder={"Enter the lastName"}
              className="form-control col-md-12"
              defaultValue={employee.lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group col-md-5">
            <label htmlFor="email">Everest Email</label>
            <input
              id="email"
              placeholder={"Enter the email"}
              className="form-control col-md-12"
              type="text"
              defaultValue={employee.everestEmailId}
              onChange={(e) => setEverestEmailId(e.target.value)}
            />
          </div>
          <div className="form-group col-md-5">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              placeholder={"Enter the password"}
              className="form-control col-md-12"
              type="password"
              defaultValue={employee.password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group col-md-10">
            <label htmlFor="email">Personal Email</label>
            <input
              id="email"
              placeholder={"Enter the email"}
              className="form-control col-md-12"
              type="text"
              defaultValue={employee.personalEmailId}
              onChange={(e) => setPersonalEmailId(e.target.value)}
            />
          </div>
          <div className="form-group col-md-5">
            <label htmlFor="addressLine1">Address Line1</label>
            <input
              id="addressLine1"
              placeholder={"Enter the AddressLine1"}            
                className="form-control col-md-12"
            type="text"
            value={presentAddress.addressLine1}
              onChange={(e) =>setPresentAddress({...presentAddress,addressLine1:e.target.value})}
              
            />
          </div>
          <div className="form-group col-md-5">
            <label htmlFor="addressLine2">Address Line2</label>
            <input
              id="addressLine2"
              placeholder={"Enter the AddressLine2"}
              className="form-control col-md-12"
             type="text"
             value={presentAddress.addressLine2}
              onChange={(e) => setPresentAddress({...presentAddress,addressLine2:e.target.value})}
            />
          </div>
          <div className="form-group col-md-5">
            <label htmlFor="city">City</label>
            <input
              id="city"
              placeholder={"Enter the city"}
              className="form-control col-md-12"
              type="text"
              value={presentAddress.city}
             
              onChange={(e) => setPresentAddress({...presentAddress,city:e.target.value})}
            />
          </div>
          <div className="form-group col-md-5">
            <label htmlFor="state">State</label>
            <input
              id="state"
              placeholder={"Enter the state"}
              className="form-control col-md-12"
          type="text"
          value={presentAddress.state}
      
              onChange={(e) =>setPresentAddress({...presentAddress,state:e.target.value})}
            />
          </div>
          <div className="form-group col-md-10">
            <label htmlFor="zipCode">Zip Code</label>
            <input
              id="zipCode"
              placeholder={"Enter the zipCode"}
              className="form-control col-md-12"
              type="number"
              value={presentAddress.zipCode}
               onChange={(e) => setPresentAddress({...presentAddress,zipCode:e.target.value})}
            />
          
            </div>
            <div className="form-group col-md-5">
            <label htmlFor="addressLine1">Address Line1</label>
            <input
              id="addressLine1"
              placeholder={"Enter the AddressLine1"}
              className="form-control col-md-12"
              type="text"
              value={permanentAddress.addressLine1}
              onChange={(e) =>setPermanentAddress({...permanentAddress,addressLine1:e.target.value})}
            />
          </div>
          <div className="form-group col-md-5">
            <label htmlFor="addressLine2">Address Line2</label>
            <input
              id="addressLine2"
              placeholder={"Enter the AddressLine2"}
              className="form-control col-md-12"
             type="text"
             value={permanentAddress.addressLine2}
              onChange={(e) => setPermanentAddress({...permanentAddress,addressLine2:e.target.value})}
            />
          </div>
          <div className="form-group col-md-5">
            <label htmlFor="city">City</label>
            <input
              id="city"
              placeholder={"Enter the city"}
              className="form-control col-md-12"
              type="text"
              value={permanentAddress.city}
              onChange={(e) => setPermanentAddress({...permanentAddress,city:e.target.value})}
            />
          </div>
          <div className="form-group col-md-5">
            <label htmlFor="state">State</label>
            <input
              id="state"
              placeholder={"Enter the state"}
              className="form-control col-md-12"
              value={permanentAddress.state}
              type="text"
              onChange={(e) => setPermanentAddress({...permanentAddress,state:e.target.value})}
            />
          </div>
          <div className="form-group col-md-10">
            <label htmlFor="zipCode">Zip Code</label>
            <input
              id="zipCode"
              placeholder={"Enter the zipCode"}
              className="form-control col-md-12"
              type="number"
              value={permanentAddress.zipCode}
              onChange={(e) =>setPermanentAddress({...permanentAddress,zipCode:e.target.value})}
            />
            </div>
          <div className="form-group col-md-10">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UpdateEmployeeComponent;
