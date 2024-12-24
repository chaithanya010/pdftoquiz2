from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import models
from ..services import text_processor, llm
from typing import List
import json

router = APIRouter()

@router.post("/projects/")
def create_project(name: str, db: Session = Depends(get_db)):
    project = models.Project(name=name)
    db.add(project)
    db.commit()
    db.refresh(project)
    return project

@router.post("/documents/upload")
def upload_document(project_id: int, content: str, filename: str, db: Session = Depends(get_db)):
    document = models.Document(
        project_id=project_id,
        filename=filename,
        content=content
    )
    db.add(document)
    db.commit()
    db.refresh(document)
    return document

@router.get("/documents/{document_id}")
def get_document(document_id: int, db: Session = Depends(get_db)):
    document = db.query(models.Document).filter(models.Document.id == document_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    return document

@router.post("/questions/generate")
def generate_questions(document_id: int, db: Session = Depends(get_db)):
    document = db.query(models.Document).filter(models.Document.id == document_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    # Process text and generate questions
    processed_text = text_processor.process_text(document.content)
    questions = llm.generate_questions(processed_text)
    
    # Save questions to database
    db_questions = []
    for q in questions:
        question = models.Question(
            document_id=document_id,
            question_text=q["question"],
            correct_answer=q["correct_answer"],
            options=q["options"]
        )
        db.add(question)
        db_questions.append(question)
    
    db.commit()
    return db_questions

@router.get("/questions/{question_id}")
def get_question(question_id: int, db: Session = Depends(get_db)):
    question = db.query(models.Question).filter(models.Question.id == question_id).first()
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    return question 