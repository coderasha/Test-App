import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  IsDateString,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  salary?: number;

  @IsNumber()
  @IsNotEmpty()
  departmentId: number;

  @IsDateString()
  @IsNotEmpty()
  hireDate: string;
}
