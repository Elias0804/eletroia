from typing import List

from pydantic import BaseModel, Field


class DiagnosticRequest(BaseModel):
    symptoms: List[str] = Field(..., min_items=1, example=["não liga", "faz barulho"])


class DiagnosticIssue(BaseModel):
    id: int
    title: str
    description: str
    symptoms: List[str]
    solution: str
    follow_up_questions: List[str] = Field(default_factory=list)
    confidence: float = Field(default=0.0, ge=0.0, le=1.0)


class DiagnosticResult(BaseModel):
    query: List[str]
    recommendations: List[DiagnosticIssue]
