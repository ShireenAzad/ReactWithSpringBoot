package com.everestengineering.employeeportalapplication.entities;

import lombok.Data;
import org.hibernate.validator.constraints.Range;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import java.util.Date;

@Data
@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long empId;
    @NotEmpty
    @Pattern(regexp = "[A-Za-z]*", message = "Please enter only alpha characters.")
    private String firstName;
    @NotEmpty
    @Pattern(regexp = "[A-Za-z]*", message = "Please enter only alpha characters.")
    private String lastName;
    @Column(unique = true, nullable = false)
    @Pattern(regexp = ".+@everest.engineering", message = "Please enter valid Everest email address")
    private String everestEmailId;
    @NotEmpty
    private String password;
    @Column(unique = true, nullable = false)
    @Email
    private String personalEmailId;
    private Date dateOfBirth;
    private Date dateOfJoin;
    private String designation;
    @Range(min = 0, max = 80, message = "Please enter the experience between 0 to 80")
    private Long experience;
    private String bio;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "present_addr_id")
    private Address presentAddress;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "permanent_addr_id")
    private Address permanentAddress;
}
