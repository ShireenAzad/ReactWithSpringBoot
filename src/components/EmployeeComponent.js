import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as employeeService from "../services/EmployeeService";
import "bootstrap/dist/css/bootstrap.min.css";
const EmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [empId, setEmpId] = useState("");
  const [empName, setEmpName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [everestEmailId, setEverestEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [personalEmailId, setPersonalEmailId] = useState("");

  const [isUpdate, setIsUpdate] = useState(false);
  const [searchName, setSearchName] = useState("");
  const editEmployee = (id) => {
    employeeService.getEmployeeById(id).then((response) => {
      setEmpId(response.data.empId);
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setEverestEmailId(response.data.everestEmailId);
      setPassword(response.data.password);
      setPersonalEmailId(response.data.personalEmailId);
    });
  };
  const searchEmployeeByFirstOrLastName = () => {
    employeeService
      .getEmployeeByFirstNameOrLastName(empName)
      .then((response) => {
        console.log(response)
        setEmployees(response.data.data);
      })
      .catch((e) => console.log("error", e));
  };

  const getAllEmployees = () => {
    employeeService
      .getAllEmployees()
      .then((response) => {
        console.log("fetched employees successfully", response);
        setEmployees(response.data);
      })
      .catch((e) => console.log("error", e));
  };
  const deleteEmployee = (id) => {
    employeeService
      .deleteEmployee(id)
      .then((response) => {
        console.log("employee deleted successfully", response);
        getAllEmployees();
      })
      .catch((e) => console.log("error", e));
  };
  useEffect(() => {
    getAllEmployees();
  }, []);
  return (
    <div className="container">
      <h1>Employee Portal</h1>
      <hr />

      <div className="ui search">
        <div className="ui icon input">
        <input
          type="text"
          className="form-group col-md-5"
          placeholder="Search  Employee Name"
          value={empName}
          onChange={(e) => setEmpName(e.target.value)}
        /><i className="searchicon"></i>
          <button
                      className={"btn btn-danger"}
                      onClick={searchEmployeeByFirstOrLastName}
                    >
                      Search
                    </button>
          <Link to="/add" className="btn btn-primary btn-lg float-end">
            Add Employee
          </Link>
        </div>
      </div>

      <div id={"employeeList"}>
        <table className={"table"}>
          <thead>
            <tr>
              <td>Id</td>
              <td>Name</td>
              <td>Email</td>
              <td>View</td>
              <td>Edit</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => {
              return (
                <tr key={emp.id}>
                  <td>{emp.empId}</td>
                  <td>
                    {emp.firstName} {emp.lastName}
                  </td>
                  <td>{emp.everestEmailId}</td>
                  <td>
                    {" "}
                    <Link className="btn btn-primary" to={`/${emp.empId}`}>
                      View
                    </Link>
                  </td>
                  <td>
                    {" "}
                    <Link className="btn btn-info" to={`/edit/${emp.empId}`}>
                      Update
                    </Link>
                  </td>
                  <td>
                    <button
                      className={"btn btn-danger"}
                      onClick={() => deleteEmployee(emp.empId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeComponent;
