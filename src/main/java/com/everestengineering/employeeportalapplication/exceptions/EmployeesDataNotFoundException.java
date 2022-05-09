
package com.everestengineering.employeeportalapplication.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class EmployeesDataNotFoundException extends RuntimeException {
    public EmployeesDataNotFoundException(String message) {
        super(message);
    }
}