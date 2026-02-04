from database.ConnectionNeo4J import ConnectionNeo4j
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.Insigne import router as insignes_router
from routes.Emblème import router as emblemes_router

app = FastAPI(title="API Insignes")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(insignes_router)
app.include_router(emblemes_router)

@app.get("/")
def root():
    return {"status": "API en ligne 🚀"}

