from flask import Flask, session, request, url_for, render_template, jsonify, redirect, flash
from markdown_it import MarkdownIt
import db

app = Flask(__name__)
app.secret_key = "Craigslist_S3cret_K3y"

regions = {
    "asia/pacific": {
        "adelaide": "adelaide",
        "auckland": "auckland",
        "bangalore": "bangalore",
        "bangladesh": "bangladesh",
        "beijing": "beijing",
        "brisbane": "brisbane",
        "chennai": "chennai",
        "christchurch": "christchurch",
        "delhi": "delhi",
        "guangzhou": "guangzhou",
        "hong kong": "hongkong",
        "hyderabad": "hyderabad",
        "indonesia": "jakarta",
        "kolkata": "kolkata",
        "malaysia": "malaysia",
        "manila": "manila",
        "melbourne": "melbourne",
        "micronesia": "micronesia",
        "mumbai": "mumbai",
        "osaka": "osaka",
        "perth": "perth",
        "pune": "pune",
        "seoul": "seoul",
        "shanghai": "shanghai",
        "singapore": "singapore",
        "sydney": "sydney",
        "taiwan": "taipei",
        "thailand": "bangkok",
        "tokyo": "tokyo",
        "vietnam": "vietnam",
        "wellington": "wellington"
    }
}

subregions = {
    "philippines": {
        "bacolod": "bacolod",
        "bicol region": "naga",
        "cagayan de oro": "cdo",
        "cebu": "cebu",
        "davao city": "davaocity",
        "iloilo": "iloilo",
        "manila": "manila",
        "pampanga": "pampanga",
        "zamboanga": "zamboanga"
    }
}

categories = {
    "community": [
        "activities", "artists", "childcare", "classes", "events", "general", "groups", "local news",
        "lost+found", "missed connections", "musicians", "pets", "politics", "rants & raves", "rideshare", "volunteers"
    ],
    "services": [
        "automotive", "beauty", "cell/mobile", "computer", "creative", "cycle", "event", "farm+garden", "financial", "health/well", "household",
        "labor/move", "legal", "lessons", "marine", "pet", "real estate", "skilled trade", "sm biz ads", "travel/vac", "write/ed/tran"
    ],
    "discussion forums": [
        "apple", "art", "atheist", "autos", "beauty", "bikes", "celebs", "comp", "cosmos", "diet", "divorce", "dying", "eco", "feedbk", "film", 
        "fixit", "food", "frugal", "gaming", "garden", "haiku", "help", "history", "housing", "jobs", "jokes", "legal", "manners", "marriage",
        "money", "music", "open", "parent", "pets", "philos", "photo", "politics", "psych", "recover", "religion", "rofo", "science", "spirit",
        "sports", "super", "tax", "travel", "tv", "vegan", "words", "writing"
    ],
    "gigs": [],
    "housing": [
        "apts / housing", "housing swap", "housing wanted", "office / commercial", "parking / storage", "real estate for sale", "rooms / shared",
        "rooms wanted", "sublets / temporary", "vacation rentals"
    ],
    "for sale": [
        "antiques", "appliances", "arts+crafts", "atv/utv/sno", "auto parts", "aviation", "baby+kid", "barter", "beauty+hlth", "bike parts", "bikes",
        "boat parts", "boats", "books", "business", "cars+trucks", "cds/dvd/vhs", "cell phones", "clothes+acc", "collectibles", "computer parts",
        "computers", "electronics", "farm+garden", "free", "furniture", "garage sale", "general", "heavy equip", "household", "jewerly", "materials",
        "motorcycle parts", "motorcycles", "music instr", "photo+video", "rvs+camp", "sporting", "tickets", "tools", "toys+games", "trailers",
        "video gaming", "wanted", "wheels+tires"
    ],
    "jobs": [
        "accounting+finance", "admin / office", "arch / engineering", "art / media / design", "biotech / science", "business / mgmt", "customer service",
        "education", "etc / misc", "food / bev / hosp", "general labor", "government", "human resources", "legal / paralegal", "manufacturing",
        "marketing / pr / ad", "medical / health", "nonprofit sector", "real estate", "retail / wholesale", "sales / biz dev", "salon / spa / fitness",
        "security", "skilled trade / craft", "software / qa / dba", "systems / network", "technical support", "transport", "tv / film / video",
        "web / info design", "writing / editing"
    ],
    "resumes": []
}

# Initialize database
db.init_db()

#------- ROUTES -------#

@app.route("/")
def index():
    """Renders the index page for the root endpoint."""
    return render_template("index.html", subregions = subregions['philippines'],
                           main_region = "philippines", main_continent = "asia/pacific",
                           categories1 = dict(list(categories.items())[:4]),
                           categories2 = dict(list(categories.items())[4:]),
                           len = len)

#------- POSTINGS AND LISTINGS -------#

@app.route("/create-post", methods=['GET', 'POST'])
def create_post():
    """Create a new post with Markdown support."""
    if request.method == 'POST':
        title = request.form.get('title')
        content = request.form.get('content')
        category = request.form.get('category')

        if not title or not content or not category:
            flash("All fields are required", "error")
            return redirect(url_for('create_post'))

        # Convert Markdown content to HTML
        md = MarkdownIt()
        html_content = md.render(content)

        # Save post to the database
        success, message = db.save_post(title, html_content, category, session.get('user_id'))
        if success:
            flash("Post created successfully!", "success")
            return redirect(url_for('index'))
        else:
            flash(message, "error")
            return redirect(url_for('create_post'))

    return render_template("posting-creation.html", categories=categories)

@app.route("/preview-post", methods=['POST'])
def preview_post():
    """Preview a post with Markdown support."""
    content = request.form.get('content')

    # Convert Markdown content to HTML
    md = MarkdownIt()
    html_content = md.render(content)

    return jsonify({"html": html_content})

@app.route("/housing-listings", methods=['GET', 'POST'])
def housing():
    """Listings of all Housing Postings."""
    # Retrieve all housing postings from the database filtered by category
    postings = db.get_all_postings_by_category("housing")

    # Redirect to the posting page when an item is clicked
    if request.method == 'POST':
        posting_id = request.form.get('posting_id')
        if posting_id:
            return redirect(url_for('posting', id=posting_id))

    return render_template("housing.html", postings=postings)

@app.route("/posting", methods = ['GET', 'POST'])
def posting():
    """Postings for Sale, Advertisements, and Services."""
    posting_id = request.args.get('id')

    if not posting_id:
        return render_template("404.html"), 404

    # Retrieve the posting from the database
    posting = db.get_posting_by_id(posting_id)

    if not posting:
        flash("Posting not found", "error")
        return redirect(url_for('index'))
    return render_template("posting.html")

#------- USER ACCOUNT MANAGEMENT -------#

@app.route("/account")
def account_page():
    if "username" not in session.keys() or session.get("username") != None:
        return redirect(url_for('login_page'))
    return "user account page"

@app.route("/login", methods = ['GET', 'POST'])
def login_page():
    """Handle user login."""

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
    
    if not username or not password:
        flash("Please enter both username and password", "error")
        return redirect(url_for('login_page'))
    
    # Validate password
    if len(password) < 8:
        flash("Password must be at least 8 characters long", "error")
        return redirect(url_for('login_page'))
    
    # Register user
    success, message = db.register_user(username, password)
    
    if success:
        # Set session variables for auto-login
        session['username'] = username
        user_data = db.get_user_by_username(username)
        if user_data:
            session['user_id'] = user_data
            
        flash("Account created successfully!", "success")
        return redirect(url_for('login_page'))
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

