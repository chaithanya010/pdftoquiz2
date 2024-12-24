# PDFtoQuiz2

A web application that converts PDF documents into interactive quizzes using AI.

## Backend MVP Structure

### Database Schema

projects
├── id (PK)
├── name
├── created_at
└── updated_at

documents
├── id (PK)
├── project_id (FK)
├── filename
├── content
├── created_at
└── updated_at

questions
├── id (PK)
├── document_id (FK)
├── question_text
├── correct_answer
├── options (JSON)
├── created_at
└── updated_at

### Setup Instructions

1. Install dependencies:
`cd backend
pip install -r requirements.txt`

2. Database Setup with Alembic:
`# Initialize alembic
alembic init alem0bic

# Generate initial migration
alembic revision --autogenerate -m "Initial migration"

# Run migrations
alembic upgrade head`

3. Environment Setup:
- Copy `.env.example` to `.env`
- Update database credentials and other configurations

4. Run Development Server:
`uvicorn app.main:app --reload`

### API Endpoints

- POST `/api/v1/documents/upload` - Upload PDF document
- GET `/api/v1/documents/{id}` - Get document details
- POST `/api/v1/questions/generate` - Generate questions from document
- GET `/api/v1/questions/{id}` - Get specific question

## Development

More details coming soon...