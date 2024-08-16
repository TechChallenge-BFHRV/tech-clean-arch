import { Customer } from "src/core/entities/customer.entity";

export abstract class ApiGatewayInterface {
    abstract getUser(username: string): Promise<Customer>;
}