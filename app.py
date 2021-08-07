from flask import Flask, render_template, redirect
from flask_sqlalchemy import SQLAlchemy
import finbert_app

app = Flask(__name__)

db = SQLAlchemy(app)

@app.route("/")
def home():

    return render_template("index.html", finbert_app=finbert_data)

if __name__ == "__main__":
    app.run(debug=True)