from fastapi import FastAPI

app = FastAPI()

@app.post("/send-email")
def send_email(email: dict):
    # Example: Send email using an SMTP server
    return {"message": "Email sent", "email": email}