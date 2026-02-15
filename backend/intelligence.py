def generate_ai_summary(row, risk_level):

    if risk_level == "High":
        return (
            "Customer shows strong early financial stress signals. "
            "Cashflow instability and high credit utilization suggest liquidity pressure. "
            "Recommend empathetic intervention before delinquency."
        )

    if risk_level == "Medium":
        return (
            "Customer behaviour indicates emerging financial pressure. "
            "Soft monitoring and proactive outreach recommended."
        )

    return "Customer behaviour appears stable with no major stress indicators."


def suggest_intervention(risk_level, row):

    if risk_level == "High":
        if row["hospital_spend_flag"] == 1:
            return "Offer EMI Restructuring Support"
        return "Offer Payment Holiday Option"

    if risk_level == "Medium":
        return "Send Supportive App Notification"

    return "No Action Required"
