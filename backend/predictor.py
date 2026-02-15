from dataset import load_indian_customer_data
from model import train_risk_model, FEATURES
from intelligence import generate_ai_summary, suggest_intervention
from drift_engine import simulate_previous_behaviour, calculate_drift_signals, generate_drift_insights
from timeline_engine import generate_risk_timeline

# Load dataset + train model once
data = load_indian_customer_data()
model = train_risk_model(data)


# 🔥 Sidebar Customer List
def get_all_customers():
    """
    Returns minimal customer list for sidebar.
    Future-safe if you want to add risk coloring later.
    """
    return data[["customer_id", "name"]].to_dict(orient="records")


# 🔥 Main Intelligence Engine
def predict_customer_intelligence(customer_id):

    row = data[data["customer_id"] == customer_id]

    if row.empty:
        return None

    X = row[FEATURES]
    current = X.iloc[0]

    # =========================
    # ML Risk Score
    # =========================
    risk_prob = model.predict_proba(X)[0][1]

    if risk_prob < 0.4:
        risk_level = "Low"
    elif risk_prob < 0.7:
        risk_level = "Medium"
    else:
        risk_level = "High"

    # =========================
    # Explainability
    # =========================
    drivers = current.sort_values(ascending=False).head(3).index.tolist()

    # =========================
    # Behaviour Drift Intelligence
    # =========================
    previous = simulate_previous_behaviour(current)
    drift = calculate_drift_signals(current, previous)
    drift_insights = generate_drift_insights(drift)

    # =========================
    # AI Narrative + Intervention
    # =========================
    ai_summary = generate_ai_summary(current, risk_level)
    intervention = suggest_intervention(risk_level, current)

    # =========================
    # Timeline Engine
    # =========================
    risk_timeline = generate_risk_timeline(current)

    # =========================
    # FINAL RESPONSE (Frontend uses this)
    # =========================
    return {
        # Basic Identity
        "customer_name": row["name"].values[0],

        # 🔥 NEW CONTACT DATA (FOR MODAL)
        "email": row["email"].values[0],
        "phone": row["phone"].values[0],
        "address": row["address"].values[0],
        "product": row["product"].values[0],
        "geography": row["geography"].values[0],

        # Risk Intelligence
        "risk_score": float(risk_prob),
        "risk_level": risk_level,
        "top_drivers": drivers,

        # AI Layer
        "ai_summary": ai_summary,
        "recommended_action": intervention,
        "drift_insights": drift_insights,

        # Visualization Data
        "risk_timeline": risk_timeline,
        "features": current.to_dict()
    }
