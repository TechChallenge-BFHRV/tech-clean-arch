# FIAP Tech Challenge 7SOAT
# Tech Challenge #4

## Group #49 - Members

- Felipe José Cardoso de Sousa (Discord: **Felipe Sousa - RM355595**)
- Robson Batista da Silva (Discord: **Robson - RM356014**)
- Vinicius Pereira (Discord: **Vinicius Pereira - RM355809**)
- Henrique Perez Bego (Discord: **Henrique Bego - RM354844**)
- Breno Silva Sobral (Discord: **Breno - RM355234**)

## Business Requirements

A lanchonete precisa de um sistema de controle de pedidos para evitar confusões e garantir a eficiência no atendimento. A lanchonete irá investir em um sistema de autoatendimento de fast food, que é composto por uma série de dispositivos e interfaces que permitem aos clientes selecionar e fazer pedidos sem precisar interagir com um atendente.

## Project Design

![Thumbnail of Business Process achieved through Event Storming in Miro](terraform-architecture.png)

## Business Process 

![Thumbnail of Business Process achieved through Event Storming in Miro](thumbnail.png)

[Miro Link](https://miro.com/app/board/uXjVKVo2egw=/)

[GitHub Link](https://github.com/TechChallenge-BFHRV/tech-clean-arch)

## Infrastructure Requirements 

- Docker and Docker Compose
- Orquestração com Kubernetes

## Technologies
- Docker and DockerHub
- Fastify and NestJS
- Prisma
- Jest
- PostgreSQL in AWS RDS
- Kubernetes
- Bullmq
- Logging with Winston
- Prettier (Code formatter), ESLint (Linter)

## Architectural Drawing

![Thumbnail of Business Process achieved through Event Storming in Miro](architecture-diagram.png)

[Diagrama de Arquitetura](https://boardmix.com/app/share/CAE.CMeILiABKhBUeKNWQzzjVi9r4H6er7h7MAZAAQ/KVN6mY%EF%BC%8C)

## Documentation

Project structured with Clean Architecture, minding good practices and SOLID principles

## API Collection

API documentation is available at [Local API Docs](http://localhost:3000/docs) once the project is running.

## Getting started

Ideally, the project should be running in AWS and Azure with the help of Terraform.

To run the TECH-BACKEND project on your local machine, follow these steps (you need a public AWS RDS PostgreSQL endpoint):

1. **Environment Setup**: Create a `.env` file based on the provided `.env.example` template.
3. **Build Containers**: Use `docker-compose build` to build the Docker containers.
4. **Start Containers**: Execute `docker-compose up -d` to start the containers in detached mode.
6. **Application Access**: It’ll be launched at http://localhost:3000.
7. **Endpoint Collections**: The Postman endpoint collections are located at /docs in the root project directory.

You can import all endpoint configurations from the `/docs` folder into Postman for API testing.

## Local Kubernetes Environment

1. Generate a config map based on your local `.env` file with the command `kubectl create configmap my-config --from-env-file=.env`
2. Run `kubectl apply -f k8s/deployment.yaml`
3. Run `kubectl apply -f k8s/item-microservice-postgres-deployment.yaml`
4. Run `kubectl apply -f k8s/item-microservice-deployment.yaml`
5. Run `kubectl apply -f k8s/redis-deployment.yaml`
6. Run `kubectl apply -f k8s/service.yaml`
7. Execute `kubectl get services`
8. Get the external port from the techchallenge-k8s and then in your browser navigate to `http://localhost:ExternalPort`

To delete the pods run `kubectl delete -f k8s/filename.yaml`

## Demo Videos

- [Vídeo Fase 2](https://vimeo.com/992555215?share=copy)
- [Vídeo Fase 3](https://drive.google.com/drive/folders/1HwQPyS4O-nf2JKiHMG9BpDswYYKz_pte?usp=drive_link)