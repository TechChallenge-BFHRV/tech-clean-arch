import {
  IsInt,
  IsString,
  IsOptional,
  IsEmail,
  IsDate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CustomerDTO {
  @IsInt()
  id: number;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  cpf: string;

  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @IsDate()
  @Type(() => Date)
  updatedAt: Date;

  @ValidateNested({ each: true })
  orders: any[];

  @ValidateNested({ each: true })
  checkout: any[];
}
