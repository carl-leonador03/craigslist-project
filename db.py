import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

# Database configuration
DATABASE = 'craigslist.db'

def get_db_connection():
    """Create a connection to the SQLite database."""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initialize the database with required tables if they don't exist."""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Create users table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    conn.commit()
    conn.close()
    print("Database initialized successfully!")

# HANDLES USER ACCOUNT MANAGEMENT

def register_user(username, password):
    """
    Register a new user in the database.
    
    Args:
        username: Unique username
        password: User's password (will be hashed)
        
    Returns:
        (bool, str): Success status and message
    """
    try:
        conn = get_db_connection()
        
        # Check if username already exists
        existing_user = conn.execute('SELECT * FROM users WHERE username = ?', 
                                    (username,)).fetchone()
        if existing_user:
            conn.close()
            return False, "Username already exists"
        
        # Hash the password before storing
        hashed_password = generate_password_hash(password)
        
        # Insert new user
        conn.execute('INSERT INTO users (username, password) VALUES (?, ?)',
                    (username, hashed_password))
        conn.commit()
        conn.close()
        
        return True, "User registered successfully"
    
    except sqlite3.Error as e:
        return False, f"Database error: {str(e)}"

def authenticate_user(username, password):
    """
    Authenticate a user with username and password.
    
    Args:
        username: User's username
        password: User's plain text password
        
    Returns:
        (bool, str, dict): Success status, message, and user data (if successful)
    """
    try:
        conn = get_db_connection()
        user = conn.execute('SELECT * FROM users WHERE username = ?', 
                           (username,)).fetchone()
        conn.close()
        
        if not user:
            return False, "User not found", None
        
        if check_password_hash(user['password'], password):
            # Convert row to dict for easier handling
            user_data = dict(user)
            # Don't return the password hash
            user_data.pop('password', None)
            return True, "Authentication successful", user_data
        else:
            return False, "Incorrect password", None
    
    except sqlite3.Error as e:
        return False, f"Database error: {str(e)}", None

def get_user_by_username(username):
    """
    Get user data by username.
    
    Args:
        username: Username to look up
        
    Returns:
        dict or None: User data if found, None otherwise
    """
    try:
        conn = get_db_connection()
        user = conn.execute('SELECT * FROM users WHERE username = ?', 
                           (username,)).fetchone()
        conn.close()
        
        if user:
            # Convert row to dict for easier handling
            user_data = dict(user)
            # Don't return the password hash
            user_data.pop('password', None)
            return user_data
        return None
    
    except sqlite3.Error:
        return None

# HANDLES POSTINGS AND LISTINGS

def get_all_postings_by_category(category):
    """
    Get all postings from the database filtered by category.
    
    Args:
        category: The category to filter postings by.
        
    Returns:
        list: List of postings in the specified category
    """
    try:
        conn = get_db_connection()
        
        # Check if the category exists in the database
        category_exists = conn.execute('SELECT 1 FROM category WHERE name = ?', 
                                       (category,)).fetchone()
        if not category_exists:
            conn.close()
            return []
        
        # Fetch postings by category
        postings = conn.execute('SELECT * FROM posting WHERE category_name = ?', 
                                (category,)).fetchall()
        conn.close()
        
        # Convert rows to list of dicts
        return [dict(posting) for posting in postings]
    
    except sqlite3.Error:
        return []
    
def get_posting_by_id(posting_id):
    """
    Get a specific posting by its ID.
    
    Args:
        posting_id: ID of the posting to retrieve
        
    Returns:
        dict or None: Posting data if found, None otherwise
    """
    try:
        conn = get_db_connection()
        posting = conn.execute('SELECT * FROM postings WHERE id = ?', 
                               (posting_id,)).fetchone()
        conn.close()
        
        if posting:
            # Convert row to dict for easier handling
            return dict(posting)
        return None
    
    except sqlite3.Error:
        return None

# Initialize database when this module is imported
if __name__ == "__main__":
    init_db()    
    print("Database module ready.")