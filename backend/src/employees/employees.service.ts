import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    return this.prisma.employee.create({
      data: {
        ...createEmployeeDto,
        hireDate: new Date(createEmployeeDto.hireDate),
      },
      include: { department: true },
    });
  }

  async findAll() {
    return this.prisma.employee.findMany({
      include: { department: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
      include: { department: true },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      const data: any = { ...updateEmployeeDto };
      if (updateEmployeeDto.hireDate) {
        data.hireDate = new Date(updateEmployeeDto.hireDate);
      }

      return await this.prisma.employee.update({
        where: { id },
        data,
        include: { department: true },
      });
    } catch (error) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.employee.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
  }
}