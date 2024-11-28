export class Customer {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email?: string;
  name?: string;
  cpf?: string;
  orders?: any;
  checkout?: any;
  authId?: string;

  constructor({
    id,
    createdAt,
    updatedAt,
    email,
    name,
    cpf,
    orders,
    checkout,
    authId,
  }: {
    id: number,
    createdAt: Date,
    updatedAt: Date,
    email?: string,
    name?: string,
    cpf?: string,
    orders?: any,
    checkout?: any,
    authId?: string,
  }) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.cpf = cpf;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.orders = orders;
    this.checkout = checkout;
    this.authId = authId;
  }
}
