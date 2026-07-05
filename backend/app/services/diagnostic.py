from typing import List

from ..schemas.diagnostic import DiagnosticIssue

KNOWN_ISSUES = [
    DiagnosticIssue(
        id=1,
        title="Aparelho não liga",
        description="O equipamento não responde ao comando de liga ou não acende na tomada.",
        symptoms=["não liga", "sem energia", "não acende", "desliga sozinho"],
        solution="Verifique cabos, tomadas e fusíveis. Se continuar, procure assistência técnica autorizada.",
        follow_up_questions=[
            "O aparelho está conectado corretamente à tomada?",
            "A tomada e o cabo estão em boas condições?",
        ],
        confidence=0.7,
    ),
    DiagnosticIssue(
        id=2,
        title="Barulho estranho durante o uso",
        description="O aparelho apresenta ruídos incomuns, chiados ou vibrações anormais.",
        symptoms=["faz barulho", "chiado", "vibração", "ruído"],
        solution="Desligue o aparelho e verifique peças soltas ou desgaste. Entre em contato com um técnico especializado.",
        follow_up_questions=[
            "O ruído acontece em qual ciclo ou etapa de uso?",
            "Há vibração intensa ou apenas um som leve?",
        ],
        confidence=0.68,
    ),
    DiagnosticIssue(
        id=3,
        title="Superaquecimento",
        description="O equipamento fica excessivamente quente durante o funcionamento.",
        symptoms=["esquenta", "superaquecimento", "muito quente", "queima"],
        solution="Assegure ventilação adequada e evite uso contínuo prolongado. Se persistir, leve para manutenção.",
        follow_up_questions=[
            "O aparelho esquenta logo no início do ciclo ou depois de um tempo?",
            "A ventoinha ou a circulação de ar está livre?",
        ],
        confidence=0.72,
    ),
    DiagnosticIssue(
        id=4,
        title="Vazamento ou acúmulo de líquido",
        description="Há sinais de água ou outro líquido no aparelho ou em sua área próxima.",
        symptoms=["vazamento", "água", "líquido", "umidade"],
        solution="Desligue o aparelho imediatamente e procure assistência técnica para evitar danos elétricos.",
        follow_up_questions=[
            "Há vazamento em qual parte do aparelho?",
            "O problema aparece em todas as utilizações ou apenas em uma função específica?",
        ],
        confidence=0.74,
    ),
]


def _normalize_text(value: str) -> str:
    return " ".join(value.strip().lower().split())


def _build_follow_up_questions(symptoms: List[str]) -> List[str]:
    normalized = " ".join(_normalize_text(item) for item in symptoms if item.strip())
    if any(phrase in normalized for phrase in ["nao liga", "não liga", "nao acende", "não acende", "sem energia"]):
        return [
            "O aparelho está conectado corretamente à tomada?",
            "A tomada e o cabo estão em boas condições?",
        ]
    if any(phrase in normalized for phrase in ["esquenta", "quente", "superaquecimento", "queima"]):
        return [
            "O aparelho esquenta logo no início do ciclo ou depois de um tempo?",
            "A ventoinha ou a circulação de ar está livre?",
        ]
    if any(phrase in normalized for phrase in ["barulho", "ruido", "chiado", "vibracao"]):
        return [
            "O ruído acontece em qual ciclo ou etapa de uso?",
            "Há vibração intensa ou apenas um som leve?",
        ]
    if any(phrase in normalized for phrase in ["vazamento", "agua", "liquido", "umidade"]):
        return [
            "Há vazamento em qual parte do aparelho?",
            "O problema aparece em todas as utilizações ou apenas em uma função específica?",
        ]
    return ["O problema ocorre em todas as etapas de uso ou apenas em uma função específica?"]


def _estimate_confidence(score: int, symptom_count: int, total_known_symptoms: int) -> float:
    if score <= 0:
        return 0.0
    confidence = 0.45 + (score / max(1, total_known_symptoms)) * 0.4 + (0.05 * min(symptom_count, 2))
    return round(min(0.95, confidence), 2)


def diagnose_issues(symptoms: List[str], limit: int = 3) -> List[DiagnosticIssue]:
    """Retorna recomendações de diagnóstico com contexto adicional para o usuário."""
    if not symptoms:
        return [
            issue.model_copy(update={"follow_up_questions": issue.follow_up_questions, "confidence": issue.confidence})
            for issue in KNOWN_ISSUES[:limit]
        ]

    symptoms_normalized = [_normalize_text(item) for item in symptoms if item.strip()]
    scored_issues = []

    for issue in KNOWN_ISSUES:
        score = 0
        for symptom in symptoms_normalized:
            for known in issue.symptoms:
                if symptom in _normalize_text(known) or _normalize_text(known) in symptom:
                    score += 1
        if score > 0:
            follow_up_questions = _build_follow_up_questions(symptoms)
            confidence = _estimate_confidence(score, len(symptoms_normalized), len(issue.symptoms))
            scored_issues.append((score, issue.model_copy(update={"follow_up_questions": follow_up_questions, "confidence": confidence})))

    if not scored_issues:
        return [
            issue.model_copy(update={"follow_up_questions": issue.follow_up_questions, "confidence": issue.confidence})
            for issue in KNOWN_ISSUES[:limit]
        ]

    scored_issues.sort(key=lambda pair: pair[0], reverse=True)
    return [issue for _, issue in scored_issues[:limit]]
