from fastapi import FastAPI

app = FastAPI()

@app.post("/jobs")
def create_job(job: dict):
    # Example: Add job to a queue
    return {"message": "Job added to queue", "job": job}