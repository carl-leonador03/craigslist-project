from flask import Flask, url_for, render_template, jsonify, session, redirect, request

app = Flask(__name__)

@app.route("/")
def index():
    """Renders the index page for the root endpoint."""
    return render_template("index.html")

@app.route("/posting", methods = ['GET', 'POST'])
def posted_ad():
    """
    What is Seen: 👀👀👀
    The Item/Services/Jobs being advertised or sold.
    """
    return "ad posting"

@app.route("/account")
def account_page():
    if "username" not in session.keys() or session.get("username") != None:
        return redirect(url_for('login_page'))
    return "banana"

@app.route("/login", methods = ['GET', 'POST'])
def login_page():
    if request.method == 'GET':
        # For fetching the 
        return render_template('login.html')
    elif request.method == 'POST':
        # TODO: Do user login authentication.
        return "obamna"
    return "SODAAAA"

if __name__ == "__main__":
    app.run(debug=True)

