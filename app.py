from flask import Flask, url_for, render_template, jsonify
import requests, os
from lxml import etree

app = Flask(__name__)

@app.route("/")
def index():
    """Renders the index page for the root endpoint."""
    return render_template("index.html")

app.run(debug = True)