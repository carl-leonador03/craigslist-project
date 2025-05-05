from flask import Flask, url_for, render_template, jsonify
import requests, os
from lxml import etree

app = Flask(__name__)

@app.route("/")
def index():
    """Renders the index page for the root endpoint."""
    return render_template("index.html")

@app.route("/fetch/icons")
def fetch_icons():
    """Fetches the SVG icons located under static/assets/icons"""
    icons = {}
    for icon in os.listdir("static/assets/icons"):
        with open(f"static/assets/icons/{icon}") as icon_file:
            root = etree.fromstring(icon_file.read())
        icons[os.path.splitext(icon)[0]] = root.find("path", root.nsmap).get("d")
    
    return jsonify(icons)

app.run(debug = True)