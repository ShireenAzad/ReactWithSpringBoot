import React, { useState } from "react";
import * as employeeService from "../services/EmployeeService";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
const AddEmployeeComponent = () => {
  const [empId, setEmpId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [everestEmailId, setEverestEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [personalEmailId, setPersonalEmailId] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !everestEmailId || !password) {
      alert("Enter all fields");
      return;
    }
    const employee = {
      firstName,
      lastName,
      everestEmailId,
      password,
      personalEmailId,
    };

    employeeService
      .createEmployee(employee)
      .then((response) => {
        console.log("employee saved successfully", response);
        setFirstName("");
        setLastName("");
        setEverestEmailId("");
        setPassword("");
        setPersonalEmailId("");
        console.log(empId);
      })
      .catch((e) => console.log("error", e));
  };

  return (
    <div className="container">
      <h1>Employee Portal</h1>
      <hr />
      <Link className="btn btn-primary" to="/">
        back to Home
      </Link>
      <div id={"addEmployeeForm"}>
        <h2>Add New Employee</h2>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="row justify-content-center"
        >
          <div className="form-group col-md-5">
            <label htmlFor="firstName">FirstName</label>
            <input
              id="firstName"
              placeholder={"Enter the firstName"}
              className="form-control col-md-12"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group col-md-5">
            <label htmlFor="lastName">LastName</label>
            <input
              id="lastName"
              placeholder={"Enter the lastName"}
              className="form-control col-md-12"
              value={lastName}
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
              value={everestEmailId}
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
              value={password}
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
              value={personalEmailId}
              onChange={(e) => setPersonalEmailId(e.target.value)}
            />
          </div>
          <div className="form-group col-md-10">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddEmployeeComponent;
