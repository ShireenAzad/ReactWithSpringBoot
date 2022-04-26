
package com.everestengineering.employeeportalapplication.controllers;

import com.everestengineering.employeeportalapplication.entities.Employee;
import com.everestengineering.employeeportalapplication.entities.EmployeesData;
import com.everestengineering.employeeportalapplication.services.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/employees")
public class EmployeeController {
    private final EmployeeService employeeService;


    @GetMapping("/search")
    public EmployeesData getEmployeeByName(@RequestParam(name = "query") String name,
                                           @PageableDefault(page = 0, size = 2, sort = {"empId"}, direction = Sort.Direction.ASC) Pageable pageable) {
        return employeeService.findByName(name,pageable);
    }




    @GetMapping(value = "")
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable(name = "id") Long id) {
        Employee employee = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(employee);
    }

    @PostMapping(value = "")
    public ResponseEntity<Employee> createEmployee(@Valid @RequestBody Employee employee) {
        final Employee savedEmployee = employeeService.addEmployee(employee);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEmployee);
    }

    @PutMapping("/{id}")
    public Employee updateEmployee(@PathVariable(name = "id") Long id, @Valid @RequestBody Employee employee) {
        return employeeService.updateEmployee(id, employee);
    }

    @DeleteMapping("")
    public void deleteAllEmployees() {
        employeeService.deleteAllEmployees();
    }

    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable(name = "id") Long id) {
        employeeService.delete(id);
    }



}
