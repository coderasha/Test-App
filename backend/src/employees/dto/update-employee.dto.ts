import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateEmployeeDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  position?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  salary?: number;

  @IsNumber()
  @IsOptional()
  departmentId?: number;

  @IsDateString()
  @IsOptional()
  hireDate?: string;
}
