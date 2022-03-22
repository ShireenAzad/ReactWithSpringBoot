package com.everestengineering.employeeportalapplication.services;

import com.everestengineering.employeeportalapplication.entities.Employee;
import com.everestengineering.employeeportalapplication.entities.EmployeesData;
import com.everestengineering.employeeportalapplication.exceptions.EmployeesDataNotFoundException;
import com.everestengineering.employeeportalapplication.repositories.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@Transactional
@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(Long employeeId) throws EmployeesDataNotFoundException {

        if (employeeRepository.findById(employeeId).isEmpty()) {
            throw new EmployeesDataNotFoundException("EmployeeId " + employeeId + " doesn't exist");
        }
        return employeeRepository.getById(employeeId);
    }

    public Employee addEmployee(Employee employee) {
        Optional<Employee> existingEmployee = employeeRepository.findByEverestEmailId(employee.getEverestEmailId());
        if (existingEmployee.isEmpty()) {
            existingEmployee = employeeRepository.findByPersonalEmailId(employee.getPersonalEmailId());
            if (existingEmployee.isEmpty()) {
                employeeRepository.save(employee);
            } else {
                throw new EmployeesDataNotFoundException("Employee with Personal Email already exists");
            }
            return employee;
        } else {
            throw new EmployeesDataNotFoundException("Employee with EverestEmail already exists.");
        }
    }

    public Employee updateEmployee(Long employeeId, Employee employee) {
        Optional<Employee> employeeOldDetails = employeeRepository.findById(employeeId);
        if (employeeOldDetails.isPresent()) {
            Optional<Employee> employeeExistingWithEverestEmail = employeeRepository.findByEverestEmailId(employee.getEverestEmailId());
            Optional<Employee> employeeExistingWithPersonalEmail = employeeRepository.findByPersonalEmailId(employee.getPersonalEmailId());
            if (((employeeExistingWithEverestEmail.isPresent()) && (employeeExistingWithEverestEmail.get().getEmpId() != employeeOldDetails.get().getEmpId()))
                    || ((employeeExistingWithPersonalEmail.isPresent()) && employeeExistingWithPersonalEmail.get().getEmpId() != employeeOldDetails.get().getEmpId())) {
                throw new EmployeesDataNotFoundException("EverestEmail or PersonalEmail already exists");
            } else {
                employee.setEmpId(employeeOldDetails.get().getEmpId());
                employee.getPresentAddress().setId(employeeOldDetails.get().getPresentAddress().getId());
                employee.getPermanentAddress().setId(employeeOldDetails.get().getPermanentAddress().getId());
                employeeRepository.save(employee);
                return employee;

            }
        } else {
            throw new EmployeesDataNotFoundException("Invalid email or password");
        }
    }

    public void deleteAllEmployees() {


        employeeRepository.deleteAll();
    }

    public void delete(long employeeId) {

        if (employeeRepository.existsById(employeeId)) {
            employeeRepository.deleteById(employeeId);
        } else {
            throw new EmployeesDataNotFoundException("Employee with ID " + employeeId + " not Found");
        }

    }

    public EmployeesData findByName(String name, Pageable pageable) {
        if (employeeRepository.findByFirstNameContainingOrLastNameContaining(name, name, pageable).getContent().isEmpty()) {
            throw new EmployeesDataNotFoundException("Employee  with first name pattern of " + name + " or last name pattern of " + name + " not found.");
        } else {
            return new EmployeesData(employeeRepository.findByFirstNameContainingOrLastNameContaining(name, name, pageable));
        }
    }
}
