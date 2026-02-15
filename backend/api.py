from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from predictor import predict_customer_intelligence, get_all_customers

app = FastAPI()

# Allow React frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/customers")
def customers():
    return get_all_customers()

@app.get("/risk/{customer_id}")
def risk(customer_id: int):
    return predict_customer_intelligence(customer_id)
