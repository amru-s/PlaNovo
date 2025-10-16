import os
import google.generativeai as genai
from fastapi import HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Gemini AI
def configure_gemini():
    """Configure Gemini AI with API key"""
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY environment variable not found.")
    genai.configure(api_key=api_key)
    return True

# Initialize Gemini configuration
try:
    configure_gemini()
    print("✅ Gemini AI configured successfully")
except ValueError as e:
    print(f"❌ Gemini AI configuration failed: {e}")

# --- DATA MODELS ---
class SrsRequest(BaseModel):
    featureIdea: str

# --- THE FINAL, "PDF-PERFECT" MASTER PROMPT ---
SRS_PROMPT = """
You are an expert Senior Software Architect. Your sole function is to take a high-level project concept and generate a comprehensive, detailed, and project-specific Software Requirements Specification (SRS) document that is a perfect structural match to the provided template.

*RULES:*
1.  The user's input, {feature_idea}, defines the entire scope of the project. You must invent plausible, specific details for all sections based on this theme. Do not use generic placeholder text.
2.  The document MUST follow this exact structure, including all numbered sections and sub-sections:
    - *1. Introduction*: 1.1 Purpose, 1.2 Document Conventions, 1.3 Intended Audience and Reading Suggestions, 1.4 Product Scope, 1.5 References.
    - *2. Overall Description*: 2.1 Product Perspective, 2.2 Product Functions, 2.3 User Classes and Characteristics, 2.4 Operating Environment, 2.5 Design and Implementation Constraints, 2.6 User Documentation, 2.7 Assumptions and Dependencies.
    - *3. External Interface Requirements*: 3.1 User Interfaces, 3.2 Hardware Interfaces, 3.3 Software Interfaces, 3.4 Communications Interfaces.
    - *4. System Features*: You MUST identify at least three core system features based on the project theme. For each feature (e.g., 4.1, 4.2, 4.3), you MUST include "Description and Priority", "Stimulus/Response Sequences", and "Functional Requirements" with REQ-X identifiers.
    - *5. Other Nonfunctional Requirements*: 5.1 Performance Requirements, 5.2 Safety Requirements, 5.3 Security Requirements, 5.4 Software Quality Attributes, 5.5 Business Rules.
    - *6. Other Requirements*: Invent one or two other relevant requirements (e.g., Legal, Internationalization).
    - *Appendix A: Glossary*: Define technical terms used in the document.
    - *Appendix B: Analysis Models*: Describe a relevant analysis model (e.g., an Entity-Relationship Diagram).
    - *Appendix C: To Be Determined List*: Create a small list of items that would need further clarification.
3.  Respond ONLY with the complete SRS document in Markdown. Do not include any conversational text.

---

*USER REQUEST:*
{feature_idea}

*YOUR RESPONSE:*
"""
# --- SRS GENERATION FUNCTION ---
async def generate_srs_document(feature_idea: str) -> dict:
    """
    Generate SRS document from feature idea using Gemini AI
    
    Args:
        feature_idea (str): The feature description to generate SRS for
        
    Returns:
        dict: Contains the generated SRS document
        
    Raises:
        HTTPException: If generation fails
    """
    if not feature_idea or not feature_idea.strip():
        raise HTTPException(status_code=400, detail="Feature idea cannot be empty.")
    
    try:
        model = genai.GenerativeModel('models/gemini-pro-latest')
        full_prompt = SRS_PROMPT.format(feature_idea=feature_idea.strip())
        response = model.generate_content(full_prompt)
        
        if not response.text:
            raise HTTPException(status_code=500, detail="Gemini AI returned empty response.")
            
        return {
            "srs_document": response.text,
            "feature_idea": feature_idea.strip(),
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"SRS generation failed: {str(e)}"
        )