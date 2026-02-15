import numpy as np

def simulate_previous_behaviour(row):

    prev = row.copy()

    prev["salary_delay_days"] = max(0, row["salary_delay_days"] - np.random.randint(0,3))
    prev["savings_drawdown_pct"] = max(0, row["savings_drawdown_pct"] - np.random.uniform(0.05,0.2))
    prev["credit_utilization_ratio"] = max(0.2, row["credit_utilization_ratio"] - np.random.uniform(0.05,0.15))
    prev["discretionary_spend_drop"] = max(0, row["discretionary_spend_drop"] - np.random.uniform(0.05,0.2))

    return prev


def calculate_drift_signals(current, previous):

    return {
        "salary_delay_trend": current["salary_delay_days"] - previous["salary_delay_days"],
        "savings_trend": current["savings_drawdown_pct"] - previous["savings_drawdown_pct"],
        "credit_trend": current["credit_utilization_ratio"] - previous["credit_utilization_ratio"],
        "spending_trend": current["discretionary_spend_drop"] - previous["discretionary_spend_drop"]
    }


def generate_drift_insights(drift):

    insights = []

    if drift["salary_delay_trend"] > 2:
        insights.append("Salary delays increasing")

    if drift["savings_trend"] > 0.1:
        insights.append("Savings declining rapidly")

    if drift["credit_trend"] > 0.1:
        insights.append("Credit utilization rising")

    if drift["spending_trend"] > 0.1:
        insights.append("Discretionary spending dropping")

    return insights
