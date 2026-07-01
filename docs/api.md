# API

## POST /api/diagnostic/analyze

Request:
```json
{
  "symptoms": ["não liga", "faz barulho"]
}
```

Response:
```json
{
  "query": ["não liga", "faz barulho"],
  "recommendations": [
    {
      "id": 1,
      "title": "Aparelho não liga",
      "description": "...",
      "symptoms": ["não liga", "sem energia"],
      "solution": "..."
    }
  ]
}
```
