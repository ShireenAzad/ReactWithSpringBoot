package com.everestengineering.employeeportalapplication.entities;

import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;
@Data
public class EmployeesData {
    private List<Employee> data;
    private long totalElements;
    private long totalPages;
    private long pageSize;
    private long currentPage;
    private boolean hasNext;
    private boolean hasPrevious;

    public EmployeesData(Page<Employee> employeesData){
        this.setData(employeesData.getContent());
        this.setTotalElements(employeesData.getTotalElements());
        this.setTotalPages(employeesData.getTotalPages());
        this.setPageSize(employeesData.getSize());
        this.setCurrentPage(employeesData.getNumber()+1);
        this.setHasNext(employeesData.hasNext());
        this.setHasPrevious(employeesData.hasPrevious());
    }
}