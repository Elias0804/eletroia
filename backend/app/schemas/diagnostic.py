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


class DiagnosticResult(BaseModel):
    query: List[str]
    recommendations: List[DiagnosticIssue]
