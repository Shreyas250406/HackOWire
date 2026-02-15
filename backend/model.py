from xgboost import XGBClassifier

FEATURES = [
    "salary_delay_days",
    "savings_drawdown_pct",
    "credit_utilization_ratio",
    "discretionary_spend_drop",
    "utility_payment_delay",
    "hospital_spend_flag",
    "atm_withdrawal_spike",
    "failed_autodebit_count"
]

def train_risk_model(df):

    X = df[FEATURES]
    y = df["risk_label"]

    model = XGBClassifier(
        n_estimators=60,
        max_depth=3,
        learning_rate=0.1,
        eval_metric="logloss"
    )

    model.fit(X,y)
    return model
