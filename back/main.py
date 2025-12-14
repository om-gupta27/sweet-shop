from fastapi import FastAPI
from database import engine
import models
from routes import auth, sweets
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


models.Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(sweets.router)

@app.get("/")
def root():
    return {"message": "Sweet Shop API is running"}
