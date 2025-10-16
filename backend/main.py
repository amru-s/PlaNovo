from fastapi import Depends, FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from sqlmodel import Session

from database import get_session
from webhooks import handle_webhook_event
from srs_generator import SrsRequest, generate_srs_document

# Load environment variables
load_dotenv()

# Create FastAPI app instance
app = FastAPI(
    title="PlaNovo API",
    description="Backend API for PlaNovo - Agentic AI for Project Management",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Local development
        "https://planovo.vercel.app",  # Production frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Root endpoint for health check"""
    return {"status": "ok", "message": "PlaNovo API is running"}


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "PlaNovo API",
        "version": "1.0.0"
    }


@app.get("/db-test")
async def test_database(session: Session = Depends(get_session)):
    """Test database connection"""
    try:
        # Simple database test
        from sqlalchemy import text
        result = session.execute(text("SELECT 1 as test"))
        test_value = result.fetchone()
        return {
            "status": "ok", 
            "message": "Database connection successful",
            "test_result": test_value[0] if test_value else None
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Database connection failed: {str(e)}"
        }


@app.post("/api/webhooks/clerk")
async def clerk_webhook(
    request: Request, session: Session = Depends(get_session)
):
    """Handle Clerk webhook events"""
    return handle_webhook_event(request, session)


@app.post("/api/srs/generate")
async def generate_srs_endpoint(request: SrsRequest):
    """
    Generate Software Requirements Specification (SRS) document from feature idea
    
    This endpoint uses Google Gemini AI to convert a high-level feature request
    into a comprehensive, structured SRS document with functional and 
    non-functional requirements.
    """
    return await generate_srs_document(request.featureIdea)


if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
