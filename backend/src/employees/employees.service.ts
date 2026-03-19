import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

type EmployeeRecord = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position: string;
  salary?: number;
  departmentId: number;
  hireDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class EmployeesService {
  private readonly employees: EmployeeRecord[] = [];
  private nextId = 1;

  create(createEmployeeDto: CreateEmployeeDto): EmployeeRecord {
    const now = new Date();
    const employee: EmployeeRecord = {
      id: this.nextId++,
      firstName: createEmployeeDto.firstName,
      lastName: createEmployeeDto.lastName,
      email: createEmployeeDto.email,
      phone: createEmployeeDto.phone,
      position: createEmployeeDto.position,
      salary: createEmployeeDto.salary,
      departmentId: createEmployeeDto.departmentId,
      hireDate: new Date(createEmployeeDto.hireDate),
      createdAt: now,
      updatedAt: now,
    };

    this.employees.unshift(employee);
    return employee;
  }

  findAll(): EmployeeRecord[] {
    return this.employees;
  }

  findOne(id: number): EmployeeRecord {
    const employee = this.employees.find((entry) => entry.id === id);
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return employee;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto): EmployeeRecord {
    const employee = this.findOne(id);

    if (updateEmployeeDto.firstName !== undefined) {
      employee.firstName = updateEmployeeDto.firstName;
    }
    if (updateEmployeeDto.lastName !== undefined) {
      employee.lastName = updateEmployeeDto.lastName;
    }
    if (updateEmployeeDto.email !== undefined) {
      employee.email = updateEmployeeDto.email;
    }
    if (updateEmployeeDto.phone !== undefined) {
      employee.phone = updateEmployeeDto.phone;
    }
    if (updateEmployeeDto.position !== undefined) {
      employee.position = updateEmployeeDto.position;
    }
    if (updateEmployeeDto.salary !== undefined) {
      employee.salary = updateEmployeeDto.salary;
    }
    if (updateEmployeeDto.departmentId !== undefined) {
      employee.departmentId = updateEmployeeDto.departmentId;
    }
    if (updateEmployeeDto.hireDate !== undefined) {
      employee.hireDate = new Date(updateEmployeeDto.hireDate);
    }

    employee.updatedAt = new Date();
    return employee;
  }

  remove(id: number): void {
    const index = this.employees.findIndex((entry) => entry.id === id);
    if (index < 0) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    this.employees.splice(index, 1);
  }
}
