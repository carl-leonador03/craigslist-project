from flask import Flask, session, request, url_for, render_template, jsonify, redirect, flash
import db

app = Flask(__name__)
app.secret_key = "Craigslist_S3cret_K3y"

# Initialize database
db.init_db()

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
    # Check if user is logged in before allowing posting
    if "username" not in session:
        flash("Please log in to create a posting", "error")
        return redirect(url_for('login_page'))
    
    return "ad posting"

@app.route("/account")
def account_page():
    if "username" not in session.keys() or session.get("username") != None:
        return redirect(url_for('login_page'))
    return "user account page"

@app.route("/login", methods = ['GET', 'POST'])
def login_page():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        if not username or not password:
            flash("Please enter both username and password", "error")
            return redirect(url_for('login_page'))
        
        # Authenticate user
        success, message, user_data = db.authenticate_user(username, password)
        
        if success:
            # Set session variables
            session['username'] = username
            session['user_id'] = user_data
            flash("Logged in successfully!", "success")
            return redirect(url_for('index'))
        else:
            flash(message, "error")
            return redirect(url_for('login_page'))
        
    return render_template('login.html')
        

@app.route("/register", methods=['POST'])
def register_page():
    """Handle user registration."""
    username = request.form.get('new_username')
    password = request.form.get('new_password')
    email = request.form.get('email', None)  # Optional email
    
    if not username or not password:
        flash("Please enter both username and password", "error")
        return redirect(url_for('login_page'))
    
    # Validate password
    if len(password) < 6:
        flash("Password must be at least 6 characters long", "error")
        return redirect(url_for('login_page'))
    
    # Register user
    success, message = db.register_user(username, password, email)
    
    if success:
        # Set session variables for auto-login
        session['username'] = username
        user_data = db.get_user_by_username(username)
        if user_data:
            session['user_id'] = user_data
            
        flash("Account created successfully!", "success")
        return redirect(url_for('index'))
    else:
        flash(message, "error")
        return redirect(url_for('login_page'))

@app.route("/logout")
def logout():
    """Handle user logout."""
    session.pop('username', None)
    session.pop('user_id', None)
    flash("You have been logged out", "success")
    return redirect(url_for('login_page'))

if __name__ == "__main__":
    app.run(debug=True)

