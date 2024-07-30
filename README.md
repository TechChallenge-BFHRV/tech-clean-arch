# FIAP Tech Challenge 7SOAT / Group 49 - Tech Challenge #2 

## Business Process 

![Thumbnail of Business Process achieved through Event Storming in Miro](thumbnail.png)

[Miro Link](https://miro.com/app/board/uXjVKVo2egw=/)

[GitHub Link](https://github.com/TechChallenge-BFHRV/tech-backend)

## Business Requirements
A lanchonete precisa de um sistema de controle de pedidos para evitar confusões e garantir a eficiência no atendimento. A lanchonete irá investir em um sistema de autoatendimento de fast food, que é composto por uma série de dispositivos e interfaces que permitem aos clientes selecionar e fazer pedidos sem precisar interagir com um atendente.

## Infrastructure Requirements 

- Docker and Docker Compose
- Orquestração com Kubernetes (AKS - Azure Kubernetes Service).

## Members

- Felipe José Cardoso de Sousa (Discord: **Felipe Sousa - RM355595**)
- Robson Batista da Silva (Discord: **Robson - RM356014**)
- Vinicius Pereira (Discord: **Vinicius Pereira - RM355809**)
- Henrique Perez Bego (Discord: **Henrique Bego - RM354844**)
- Breno Silva Sobral (Discord: **Breno - RM355234**)

## Technologies
- Docker
- Fastify and NestJS
- Prisma
- Jest
- PostgreSQL
- Kubernetes
- Bullmq
- Logging with Winston
- Prettier (Code formatter), ESLint (Linter)

## Architectural Drawing

[Diagrama de Arquitetura](https://boardmix.com/app/share/CAE.CMeILiABKhBUeKNWQzzjVi9r4H6er7h7MAZAAQ/KVN6mY%EF%BC%8C)

## Documentation

### Project structured in clean architecture, using good practices and agile structures

API documentation is available at Local API Docs once the project is running.

## Collection de APIs

API documentation is available at [Local API Docs](http://localhost:3000/docs) once the project is running.

## Getting started

To run the TECH-BACKEND project on your local machine, follow these steps:

1. **Environment Setup**: Create a `.env` file based on the provided `.env.example` template.
2. **Install Dependencies**: Run `yarn install` to install required dependencies.
3. **Build Containers**: Use `docker-compose build` to build the Docker containers.
4. **Start Containers**: Execute `docker-compose up -d` to start the containers in detached mode.
6. **Start the Application**: Use `yarn run start` to start the application.

You can import all endpoint configurations from the `/docs` folder into Postman for API testing.

## Vídeo de Demonstração

[Vídeo de Demonstração](https://youtube.com/example)

