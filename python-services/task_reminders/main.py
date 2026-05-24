from fastapi import FastAPI
from datetime import datetime, timedelta

app = FastAPI()

@app.get("/reminders")
def get_reminders():
    # Example: Fetch reminders from a database
    reminders = [
        {"task": "Complete project report", "deadline": datetime.now() + timedelta(days=1)},
        {"task": "Submit invoice", "deadline": datetime.now() + timedelta(days=2)},
    ]
    return reminders

@app.post("/reminders")
def create_reminder(reminder: dict):
    # Example: Save reminder to a database
    return {"message": "Reminder created", "reminder": reminder}