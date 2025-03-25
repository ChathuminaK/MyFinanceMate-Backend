from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import joblib

app = Flask(__name__)

# Load trained model (Make sure you have a trained model file named "expense_model.pkl")
try:
    model = joblib.load("expense_model.pkl")
except:
    model = None
    print("Warning: No trained model found!")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        expenses = pd.DataFrame(data["expenses"])

        if model:
            prediction = model.predict([expenses["amount"].sum()])
            return jsonify({"next_month_expense": prediction[0]})
        else:
            return jsonify({"error": "No trained model available"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001)
