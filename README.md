# Microservices demo

This repository is for educational purpose.  
It presents 2 cloud native microservices that works togheter with REST API

## Components

### TODO API

It's a FastAPI pythn application that expose CRUD operation on a Todo entity.  
It use SQL Alchemy for interact with database and Alembic to manage database schema.  

**Environemnt variables**:  
- `DATABASE_URL` : Databse connection string ( es: postgresql://postgres:postgres@localhost:5432/todo_db )

**Docker image**  
The docker image is build base on a python-3.11-slim.  
It will copy the source and will serve it using uvicorn web server  

### TODO Frontend

It's an Angular application that shows a list of todo and provide functionalities to edit them.  
It retrieve data from a Rest API endpoint.  

**Environemnt variables**:  
- `API_URL` : Url of the rest api backend ( es: http://api:8000 )

**Docker image**  
The docker image is build in a two stages build. 
First it will compile the Angular application with a nodejs image.  
Then it will copy the build to a ngnix image to serve the contents.  

## How to run it

Each service has a `Dockerfile` to build it as a container image.  
There is a `docker-compse.yml` file that combine the two services with a postgres DB.  
Run all the solution with :

```bash
docker-compose up --build
```

It will build the images of the services and will run them in a docker compose environment




