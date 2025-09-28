from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/api/message")
def read_message():
    return {"message": "This is a message from the FastAPI backend"}