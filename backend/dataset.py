import pandas as pd
import numpy as np

def load_indian_customer_data():

    np.random.seed(42)

    names = [
        "Amit Sharma","Rahul Verma","Neha Gupta","Priya Nair","Arjun Patel",
        "Sneha Iyer","Rohit Kulkarni","Ananya Singh","Karan Mehta","Pooja Das",
        "Vikas Yadav","Simran Kaur","Aditya Joshi","Meera Pillai","Nikhil Jain",
        "Riya Chatterjee","Manish Tiwari","Kavya Reddy","Harsh Agarwal","Divya Mishra",
        "Siddharth Shah","Isha Kapoor","Yash Malhotra","Aarti Deshpande","Raj Malviya",
        "Shreya Banerjee","Ankit Saxena","Tanvi Patil","Varun Bansal","Komal Arora",
        "Deepak Solanki","Nisha Shetty","Rajat Khanna","Saloni Trivedi","Mohit Batra",
        "Ritu Bhatt","Akash Pawar","Sonal Vora","Gaurav Sethi","Juhi Srivastava",
        "Abhishek Rao","Nandini Bose","Pankaj Dubey","Kirti Saini","Sameer Khan",
        "Bhavna Talwar","Lokesh Gupta","Payal Sood","Tarun Arvind","Reema George"
    ]

    n = len(names)

    # 🔥 Contact + Account Metadata (NEW)
    emails = [name.lower().replace(" ", ".") + "@email.com" for name in names]

    phones = [
        "+91 98765 43210",
        "+91 91234 56789",
        "+91 99887 77665",
        "+91 90000 11122",
        "+91 97654 32109"
    ] * 10

    addresses = [
        "Bandra West, Mumbai, Maharashtra 400050",
        "Indiranagar, Bengaluru, Karnataka 560038",
        "Gachibowli, Hyderabad, Telangana 500032",
        "Viman Nagar, Pune, Maharashtra 411014",
        "Salt Lake, Kolkata, West Bengal 700091"
    ] * 10

    products = [
        "Personal Loan",
        "Credit Card",
        "Auto Loan",
        "Credit Line",
        "Personal Loan"
    ] * 10

    geographies = [
        "Mumbai",
        "Bengaluru",
        "Hyderabad",
        "Pune",
        "Kolkata"
    ] * 10

    df = pd.DataFrame({
        "customer_id": range(1001,1001+n),
        "name": names,

        # 🔥 NEW CONTACT DATA
        "email": emails,
        "phone": phones[:n],
        "address": addresses[:n],
        "product": products[:n],
        "geography": geographies[:n],

        # Behaviour Signals
        "salary_delay_days": np.random.randint(0,8,n),
        "savings_drawdown_pct": np.random.uniform(0,0.6,n),
        "credit_utilization_ratio": np.random.uniform(0.2,1.0,n),
        "discretionary_spend_drop": np.random.uniform(0,0.7,n),
        "utility_payment_delay": np.random.randint(0,10,n),
        "hospital_spend_flag": np.random.randint(0,2,n),
        "atm_withdrawal_spike": np.random.randint(0,5,n),
        "failed_autodebit_count": np.random.randint(0,3,n)
    })

    # 🎯 Synthetic Risk Logic
    df["risk_label"] = (
        (df.salary_delay_days > 4) |
        (df.savings_drawdown_pct > 0.4) |
        (df.credit_utilization_ratio > 0.8)
    ).astype(int)

    return df
