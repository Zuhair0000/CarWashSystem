// Required dependencies
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Middleware to handle CORS and JSON request bodies
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // Serve static files like HTML, CSS, JS from the "public" folder

// Database connection
const db = mysql.createConnection({
  host: "localhost", // Database host (usually localhost)
  user: "root", // MySQL username
  password: "Zoherama1122@", // MySQL password (replace with your actual password)
  database: "CarWashSystem2", // The name of the database
});

// Connecting to the database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1); // Exit the app if database connection fails
  }
  console.log("Connected to the database.");
});

// API Endpoints

// Route to fetch all services for the user to choose from
app.get("/api/services", (req, res) => {
  const sql = "SELECT * FROM Services"; // Query to fetch all services
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching services:", err);
      return res.status(500).send("Error fetching services.");
    }
    res.status(200).json(results); // Send the list of services as JSON response
  });
});

// Route to create a booking
app.post("/api/bookings", (req, res) => {
  const { name, service_id, date, time } = req.body; // Extract booking details from request body

  // Check if required fields are provided
  if (!name || !service_id || !date || !time) {
    return res.status(400).send("Missing required fields.");
  }

  // SQL query to insert booking data into the Bookings table
  const sql =
    "INSERT INTO Bookings (name, service_id, date, time) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, service_id, date, time], (err) => {
    if (err) {
      console.error("Error inserting booking:", err);
      return res.status(500).send("Error creating booking.");
    }
    res.status(200).send("Booking created successfully.");
  });
});

// Route to fetch all bookings (for the owner/admin)
app.get("/api/bookings", (req, res) => {
  const sql =
    "SELECT b.id, b.name, s.name AS service, b.date, b.time FROM Bookings b JOIN Services s ON b.service_id = s.id";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching bookings:", err);
      return res.status(500).send("Error fetching bookings.");
    }
    res.status(200).json(results); // Send the list of bookings as JSON response
  });
});

// Route to submit customer feedback
app.post("/api/feedback", (req, res) => {
  const { customer_name, feedback } = req.body; // Extract feedback details from request body

  // Check if required fields are provided
  if (!customer_name || !feedback) {
    return res.status(400).send("Missing required fields.");
  }

  // SQL query to insert feedback into the Feedback table
  const sql = "INSERT INTO Feedback (customer_name, feedback) VALUES (?, ?)";
  db.query(sql, [customer_name, feedback], (err) => {
    if (err) {
      console.error("Error submitting feedback:", err);
      return res.status(500).send("Error submitting feedback.");
    }
    res.status(200).send("Feedback submitted successfully.");
  });
});

// Fetch all customer feedback
app.get("/api/feedback", (req, res) => {
  const sql = "SELECT * FROM Feedback"; // Query to fetch feedback from the database
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching feedback:", err);
      return res.status(500).send("Error fetching feedback.");
    }
    res.status(200).json(results); // Send the feedback data as a JSON response
  });
});

// Route to generate reports (for the owner/admin)
app.post("/api/reports", (req, res) => {
  const { report_type, content } = req.body; // Extract report details from request body

  // Check if required fields are provided
  if (!report_type || !content) {
    return res.status(400).send("Missing required fields.");
  }

  // SQL query to insert report into the Reports table
  const sql = "INSERT INTO Reports (report_type, content) VALUES (?, ?)";
  db.query(sql, [report_type, content], (err) => {
    if (err) {
      console.error("Error generating report:", err);
      return res.status(500).send("Error generating report.");
    }
    res.status(200).send("Report generated successfully.");
  });
});

app.get("/api/reports", (req, res) => {
  const sql = "SELECT * FROM Reports";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching reports:", err);
      return res.status(500).send("Error fetching reports.");
    }
    res.status(200).json(results); // Send the reports data as a JSON response
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
