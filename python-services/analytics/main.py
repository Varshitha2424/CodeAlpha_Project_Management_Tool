from fastapi import FastAPI

app = FastAPI()

@app.get("/analytics")
def get_analytics():
    # Example: Fetch analytics data
    analytics = {
        "active_users": 120,
        "tasks_completed": 450,
        "projects_created": 30,
    }
    return analytics