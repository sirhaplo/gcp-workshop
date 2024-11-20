# Todo API

A simple FastAPI-based Todo API with PostgreSQL backend.

## Features

- CRUD operations for Todo items
- PostgreSQL database
- Environment variable configuration
- No authentication required (for teaching purposes)
- Docker support for easy deployment

## Prerequisites

- Python 3.8+ (for local development)
- PostgreSQL (for local development)
- Docker and Docker Compose (for containerized deployment)

## Local Development Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up PostgreSQL:
- Create a database named `todo_db`
- Update `.env` file with your database credentials if needed

4. Run the application:
```bash
uvicorn app.main:app --reload
```

## Docker Deployment

1. Build and run the containers:
```bash
docker-compose up --build
```

This will:
- Build the API container
- Start a PostgreSQL container
- Create a network between the services
- Set up persistent volume for the database
- Expose the API on port 8000

To stop the services:
```bash
docker-compose down
```

## API Endpoints

- `GET /todos/`: List all todos
- `POST /todos/`: Create a new todo
- `GET /todos/{todo_id}`: Get a specific todo
- `PUT /todos/{todo_id}`: Update a todo
- `DELETE /todos/{todo_id}`: Delete a todo

## API Documentation

Once the application is running, you can access:
- Swagger UI documentation at: `http://localhost:8000/docs`
- ReDoc documentation at: `http://localhost:8000/redoc`
