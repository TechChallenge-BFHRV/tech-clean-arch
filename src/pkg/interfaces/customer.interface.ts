export interface CustomerData {
  id: number;
  email?: string;
  name?: string;
  cpf?: string;
  createdAt: Date;
  updatedAt: Date;
  orders?: any;
  checkout?: any;
  authId?: string;
}
