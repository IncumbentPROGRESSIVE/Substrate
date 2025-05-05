package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

var db *sql.DB

func initDB() {
	// Load .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dsn := os.Getenv("MYSQL_DSN")
	if dsn == "" {
		log.Fatal("MYSQL_DSN not found in environment variables")
	}

	db, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("Error opening database: %v", err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}

	_, err = db.Exec(`CREATE TABLE IF NOT EXISTS users (
		id INT AUTO_INCREMENT PRIMARY KEY,
		username VARCHAR(50) UNIQUE NOT NULL,
		password VARCHAR(50) NOT NULL
	)`)
	if err != nil {
		log.Fatalf("Error creating table: %v", err)
	}

	fmt.Println("Successfully connected to the database and ensured users table exists.")
}

func registerHandler(w http.ResponseWriter, r *http.Request) {
	var user User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		log.Printf("Error decoding user input: %v", err)
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}
	if user.Username == "" || user.Password == "" {
		log.Println("Username and password cannot be empty")
		http.Error(w, "Username and password cannot be empty", http.StatusBadRequest)
		return
	}

	_, err := db.Exec("INSERT INTO users (username, password) VALUES (?, ?)", user.Username, user.Password)
	if err != nil {
		log.Printf("Error inserting user into database: %v", err)
		http.Error(w, "Error registering user: "+err.Error(), http.StatusInternalServerError)
		return
	}

	log.Printf("User %s registered successfully", user.Username)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("User registered successfully"))
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	var user User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		log.Printf("Error decoding user input: %v", err)
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}
	if user.Username == "" || user.Password == "" {
		log.Println("Username and password cannot be empty")
		http.Error(w, "Username and password cannot be empty", http.StatusBadRequest)
		return
	}

	var storedPassword string
	err := db.QueryRow("SELECT password FROM users WHERE username = ?", user.Username).Scan(&storedPassword)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "User not found", http.StatusUnauthorized)
		} else {
			log.Printf("Error querying user: %v", err)
			http.Error(w, "Error logging in: "+err.Error(), http.StatusInternalServerError)
		}
		return
	}

	if storedPassword != user.Password {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	log.Printf("User %s logged in successfully", user.Username)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("User logged in successfully"))
}

func main() {
	initDB()
	defer db.Close()

	mux := http.NewServeMux()
	mux.HandleFunc("/register", registerHandler)
	mux.HandleFunc("/login", loginHandler)

	handler := cors.AllowAll().Handler(mux)
	log.Println("Starting server on :8080")
	http.ListenAndServe(":8080", handler)
}
