from fastapi import APIRouter, HTTPException

from ..schemas import DiagnosticRequest, DiagnosticResult
from ..services import diagnose_issues

router = APIRouter(prefix="/diagnostic", tags=["Diagnóstico"])


@router.post("/analyze", response_model=DiagnosticResult)
def analyze_diagnostic(payload: DiagnosticRequest) -> DiagnosticResult:
    issues = diagnose_issues(payload.symptoms)
    if not issues:
        raise HTTPException(status_code=404, detail="Não foram encontrados diagnósticos compatíveis.")
    return DiagnosticResult(query=payload.symptoms, recommendations=issues)
