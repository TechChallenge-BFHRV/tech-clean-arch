import { IsString, IsOptional, IsEmail, ValidateNested } from 'class-validator';

export class CustomerDTO {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  cpf: string;

  @IsOptional()
  @IsString()
  authId?: string;

  @ValidateNested({ each: true })
  orders: any[];

  @ValidateNested({ each: true })
  checkout: any[];
}
