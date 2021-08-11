from flask import Flask, render_template, redirect
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy_get_data
from flask import jsonify

# Create an instance of Flask
app = Flask(__name__)

@app.route("/")
def home():

    # return template and data
    return render_template("index.html")

@app.route("/data")
def data():

    # function to retrieve finance data from postgres
    fin_data = sqlalchemy_get_data.get_data()

    # return json
    return fin_data

if __name__ == "__main__":
    app.run(debug=True)