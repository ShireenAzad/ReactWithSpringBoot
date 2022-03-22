<img width="1440" alt="Screenshot 2022-03-22 at 4 10 05 PM" src="https://user-images.githubusercontent.com/88663880/159500729-7d2a8d02-a7cb-41e2-be02-d2a995b1f36a.png">

```diff
+ Created Add Employee Form with basic details.
+ No address is added.
```
```diff
The result json response after adding new Employee.
```
```diff
{
       "empId": 44,
       "firstName": "Shireen",
       "lastName": "Syed",
       "everestEmailId": "syed.shireen@everest.engineering",
       "password": "Sohail@0553",
       "personalEmailId": "syedshireen@gmail.com",
       "dateOfBirth": null,
       "dateOfJoin": null,
       "designation": null,
       "experience": null,
       "bio": null,
       "presentAddress": null,
       "permanentAddress": null
   }

```
<img width="1440" alt="Screenshot 2022-03-22 at 4 16 12 PM" src="https://user-images.githubusercontent.com/88663880/159501177-e1a6a9f0-3fbb-4688-94f9-22079511159b.png">

```diff
+ Fetched Employees Successfully.
```
<img width="1200" alt="Screenshot 2022-03-22 at 4 17 19 PM" src="https://user-images.githubusercontent.com/88663880/159501380-4f51304a-8662-4c75-989d-4aa8ca4be5ea.png">

```diff
+ Fetched Employee ById successfully.
```

<img width="1440" alt="Screenshot 2022-03-22 at 4 16 12 PM" src="https://user-images.githubusercontent.com/88663880/159501177-e1a6a9f0-3fbb-4688-94f9-22079511159b.png">

<img width="1437" alt="Screenshot 2022-03-22 at 4 18 02 PM" src="https://user-images.githubusercontent.com/88663880/159501549-49ece72d-5e91-411a-b56b-08fb8aa4e683.png">

```diff
+ Deleted Employee Successfully
```

```diff
- UPDATE EMPLOYEES
```

<img width="1439" alt="Screenshot 2022-03-22 at 4 20 28 PM" src="https://user-images.githubusercontent.com/88663880/159501756-21f22686-3528-4490-ab91-90258a9c59ae.png">

```diff
-java.lang.NullPointerException: Cannot invoke "com.everestengineering.employeeportalapplication.entities.Address.getId()" because the return value of "com.everestengineering.employeeportalapplication.entities.Employee.getPresentAddress()" is null at com.everestengineering.employeeportalapplication.services.EmployeeService.updateEmployee(EmployeeService.java:59) ~[classes/:na]
```
```diff
+ UpdateEmployee Function
``` 

```diff
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
   
```

```diff
- employee.getPresentAddress().setId(employeeOldDetails.get().getPresentAddress().getId());
- employee.getPermanentAddress().setId(employeeOldDetails.get().getPermanentAddress().getId());
```

```diff
employeeRepository.save(employee);
           return employee;

       }
   } else {
       throw new EmployeesDataNotFoundException("Invalid email or password");
   }
}
```
```diff
- As present and permanent address ids are null,failed to update Employee.

- If removed addresses,faced the issue of creating new addresses for employees instead of replacing(Duplication).

- ISSUE:
- 1.Failed to design objects of Temporary address and Permanent address from the frontend side.
-  2.If no address is given,failed to set the address Id for objects.


```

