import os
import json
from datetime import date
from fastapi import APIRouter, Depends, HTTPException
from google import genai
from app.auth import get_current_user
from app.models import User
from app.schemas import VoiceExpenseRequest

router = APIRouter(prefix="/voice", tags=["Voice"])

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


@router.post("/parse-expense")
def parse_voice_expense(
    data: VoiceExpenseRequest,
    current_user: User = Depends(get_current_user),
):
    try:
        prompt = f"""
        Convert this sentence into expense JSON.

        Sentence: "{data.text}"

        Today's date is {date.today()}.

        Rules:
        - If user says today, use today's date.
        - If quantity and unit price are mentioned, multiply them.
        - Choose category from:
          Food, Transport, Shopping, Bills, Entertainment, Health,
          Education, Housing, Subscriptions, Travel, Other.
        - Return JSON only.

        JSON format:
        {{
          "title": "string",
          "category": "string",
          "amount": number,
          "date": "YYYY-MM-DD",
          "description": "string"
        }}
        """

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )

        text = response.text.replace("```json", "").replace("```", "").strip()
        return json.loads(text)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))