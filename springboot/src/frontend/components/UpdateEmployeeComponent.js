import React, { useEffect, useState } from "react";
import { useHistory, useParams,Link } from "react-router-dom";

import * as employeeService from "../services/EmployeeService";
import "bootstrap/dist/css/bootstrap.min.css";
const UpdateEmployeeComponent = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    everestEmailId: "",
    password: "",
    personalEmailId: "",
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [everestEmailId, setEverestEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [personalEmailId, setPersonalEmailId] = useState("");
  const onInputChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

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
