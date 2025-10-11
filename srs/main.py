import os
import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv


# --- SETUP ---
load_dotenv()
print("--- Loaded API Key:", os.getenv("GEMINI_API_KEY"), "---") # <-- ADD THIS LINE HERE
try:
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
except TypeError:
    print("ERROR: GEMINI_API_KEY environment variable not found.")
    exit()

app = FastAPI()

# --- DATA MODELS ---
class SrsRequest(BaseModel):
    featureIdea: str

# --- THE MASTER PROMPT ---
SRS_PROMPT = """
You are an expert Senior Software Architect. Your sole function is to take a high-level feature request and generate a comprehensive Software Requirements Specification (SRS) document.

RULES:
1.  Structure your response using Markdown with three main headings: "## 1. Feature Overview", "## 2. Functional Requirements", and "## 3. Non-Functional Requirements".
2.  Under "Functional Requirements", list specific, actionable user stories. Each requirement must start with "FR-".
3.  Under "Non-Functional Requirements", you must include sections for "### Security", "### Performance", and "### Usability". Each requirement must start with "NFR-".
4.  The language must be technical, clear, and professional.
5.  Respond ONLY with the SRS document. Your response must begin IMMEDIATELY with "## 1. Feature Overview".
---

**USER REQUEST:**
{feature_idea}

**YOUR RESPONSE:**
"""

# --- API ENDPOINT ---
@app.post("/generate-srs")
async def generate_srs_endpoint(request: SrsRequest):
    if not request.featureIdea:
        raise HTTPException(status_code=400, detail="featureIdea cannot be empty.")
    try:
        # --- AFTER ---
        model = genai.GenerativeModel('models/gemini-pro-latest')
        full_prompt = SRS_PROMPT.format(feature_idea=request.featureIdea)
        response = model.generate_content(full_prompt)
        return {"srs_document": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred with the Gemini API: {str(e)}")