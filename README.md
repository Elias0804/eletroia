# EletroIA

Projeto MVP de diagnóstico assistido de aparelhos elétricos e eletrônicos.

## Backend

- `backend/app/main.py`: aplicação FastAPI
- `backend/app/routers/diagnostic.py`: rota `/api/diagnostic/analyze`
- `backend/app/services/diagnostic.py`: lógica de diagnóstico por sintomas
- `backend/app/schemas/diagnostic.py`: modelos Pydantic

### Executar backend

```bash
cd backend
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Frontend

- `frontend/app/page.tsx`: interface de diagnóstico
- `frontend/app/layout.tsx`: layout base
- `frontend/globals.css`: estilos globais com Tailwind v4

### Executar frontend

```bash
cd frontend
npm install
npm run dev
```

## Uso

1. Execute o backend em `localhost:8000`.
2. Execute o frontend em `localhost:3000`.
3. Insira sintomas na interface e clique em "Iniciar Diagnóstico".
