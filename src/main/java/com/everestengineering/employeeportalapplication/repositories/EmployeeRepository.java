package com.everestengineering.employeeportalapplication.repositories;


import com.everestengineering.employeeportalapplication.entities.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByEverestEmailId(String everestEmail);

    Optional<Employee> findByPersonalEmailId(String personalEmail);

    Page<Employee> findByFirstNameContainingOrLastNameContaining(String firstName, String lastName, Pageable pageable);

}
