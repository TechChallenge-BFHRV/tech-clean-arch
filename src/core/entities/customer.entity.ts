//TO-DO - Atualizar orders e checkout com as entidades

export class Customer {
  id: number;
  email: string;
  name: string;
  cpf: string;
  createdAt: Date;
  updatedAt: Date;
  orders?: any;
  checkout?: any;
  constructor(
    id: number,
    email: string,
    name: string,
    cpf: string,
    createdAt?: Date,
    updatedAt?: Date,
    orders?: any,
    checkout?: any,
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.cpf = cpf;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.orders = orders;
    this.checkout = checkout;
  }
}
