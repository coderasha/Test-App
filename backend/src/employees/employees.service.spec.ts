import { NotFoundException } from '@nestjs/common';
import { EmployeesService } from './employees.service';

describe('EmployeesService', () => {
  let service: EmployeesService;

  beforeEach(() => {
    service = new EmployeesService();
  });

  it('creates and retrieves an employee', () => {
    const created = service.create({
      firstName: 'Ava',
      lastName: 'Miller',
      email: 'ava.miller@company.com',
      phone: '1234567890',
      position: 'Engineer',
      salary: 80000,
      departmentId: 1,
      hireDate: '2025-03-01',
    });

    expect(created.id).toBe(1);
    expect(service.findAll()).toHaveLength(1);
    expect(service.findOne(1).email).toBe('ava.miller@company.com');
  });

  it('updates an existing employee', () => {
    service.create({
      firstName: 'Ava',
      lastName: 'Miller',
      email: 'ava.miller@company.com',
      phone: '1234567890',
      position: 'Engineer',
      salary: 80000,
      departmentId: 1,
      hireDate: '2025-03-01',
    });

    const updated = service.update(1, {
      position: 'Senior Engineer',
      salary: 95000,
    });

    expect(updated.position).toBe('Senior Engineer');
    expect(updated.salary).toBe(95000);
  });

  it('removes an employee', () => {
    service.create({
      firstName: 'Ava',
      lastName: 'Miller',
      email: 'ava.miller@company.com',
      phone: '1234567890',
      position: 'Engineer',
      salary: 80000,
      departmentId: 1,
      hireDate: '2025-03-01',
    });

    service.remove(1);
    expect(service.findAll()).toHaveLength(0);
  });

  it('throws NotFoundException for missing records', () => {
    expect(() => service.findOne(999)).toThrow(NotFoundException);
    expect(() => service.update(999, { position: 'Any' })).toThrow(
      NotFoundException,
    );
    expect(() => service.remove(999)).toThrow(NotFoundException);
  });
});
