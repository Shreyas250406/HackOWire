import numpy as np

def generate_risk_timeline(row):

    timeline = []

    base_risk = (
        row["credit_utilization_ratio"] +
        row["savings_drawdown_pct"] +
        (row["salary_delay_days"] / 10)
    ) / 3

    for i in range(4):
        noise = np.random.uniform(-0.05,0.05)
        timeline.append(max(0,min(1, base_risk + noise - (0.1*(3-i)))))

    return timeline
