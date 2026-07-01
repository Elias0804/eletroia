from typing import List

from ..schemas.diagnostic import DiagnosticIssue

KNOWN_ISSUES = [
    DiagnosticIssue(
        id=1,
        title="Aparelho não liga",
        description="O equipamento não responde ao comando de liga ou não acende na tomada.",
        symptoms=["não liga", "sem energia", "não acende", "desliga sozinho"],
        solution="Verifique cabos, tomadas e fusíveis. Se continuar, procure assistência técnica autorizada.",
    ),
    DiagnosticIssue(
        id=2,
        title="Barulho estranho durante o uso",
        description="O aparelho apresenta ruídos incomuns, chiados ou vibrações anormais.",
        symptoms=["faz barulho", "chiado", "vibração", "ruído"],
        solution="Desligue o aparelho e verifique peças soltas ou desgaste. Entre em contato com um técnico especializado.",
    ),
    DiagnosticIssue(
        id=3,
        title="Superaquecimento",
        description="O equipamento fica excessivamente quente durante o funcionamento.",
        symptoms=["esquenta", "superaquecimento", "muito quente", "queima"],
        solution="Assegure ventilação adequada e evite uso contínuo prolongado. Se persistir, leve para manutenção.",
    ),
    DiagnosticIssue(
        id=4,
        title="Vazamento ou acúmulo de líquido",
        description="Há sinais de água ou outro líquido no aparelho ou em sua área próxima.",
        symptoms=["vazamento", "água", "líquido", "umidade"],
        solution="Desligue o aparelho imediatamente e procure assistência técnica para evitar danos elétricos.",
    ),
]


def _normalize_text(value: str) -> str:
    return value.strip().lower()


def diagnose_issues(symptoms: List[str], limit: int = 3) -> List[DiagnosticIssue]:
    if not symptoms:
        return KNOWN_ISSUES[:limit]

    symptoms_normalized = [_normalize_text(item) for item in symptoms if item.strip()]
    scored_issues = []

    for issue in KNOWN_ISSUES:
        score = 0
        for symptom in symptoms_normalized:
            for known in issue.symptoms:
                if symptom in _normalize_text(known) or _normalize_text(known) in symptom:
                    score += 1
        if score > 0:
            scored_issues.append((score, issue))

    if not scored_issues:
        return KNOWN_ISSUES[:limit]

    scored_issues.sort(key=lambda pair: pair[0], reverse=True)
    return [issue for _, issue in scored_issues[:limit]]
