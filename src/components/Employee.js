import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import * as employeeService from "../services/EmployeeService";

const Employee = () => {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    everestEmailId: "",
    password: "",
    personalEmailId: "",
  });
  const { id } = useParams();
  useEffect(() => {
    loadEmployee();
  }, []);
  const loadEmployee = async () => {
    employeeService
      .getEmployeeById(id)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((e) => console.log("error", e));
  };
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        back to Home
      </Link>
      <h1 className="display-4">Employee Id: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">First Name: {employee.firstName}</li>
        <li className="list-group-item">Last Name: {employee.lastName}</li>
        <li className="list-group-item">
          Everest Email Id: {employee.everestEmailId}
        </li>
        <li className="list-group-item">Password: {employee.password}</li>
        <li className="list-group-item">
          Personal Email Id: {employee.personalEmailId}
        </li>
      </ul>
    </div>
  );
};

export default Employee;
