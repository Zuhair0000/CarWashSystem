document.addEventListener("DOMContentLoaded", async () => {
  // DOM Elements for feedback, bookings, and report display
  const feedbackTable = document
    .getElementById("feedbackTable")
    .getElementsByTagName("tbody")[0];
  const bookingsTable = document
    .getElementById("bookingsTable")
    .getElementsByTagName("tbody")[0];
  const generateReportForm = document.getElementById("generateReportForm");
  const reportResponse = document.getElementById("reportResponse");
  const reportsTable = document
    .getElementById("reportsTable")
    .getElementsByTagName("tbody")[0];

  // Function to fetch and display all customer feedback
  async function fetchFeedback() {
    try {
      const response = await fetch("http://localhost:3000/api/feedback"); // Fetch feedback data
      const feedbacks = await response.json(); // Parse the JSON response

      feedbackTable.innerHTML = ""; // Clear the table before inserting new data

      if (feedbacks.length === 0) {
        const row = feedbackTable.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 3;
        cell.textContent = "No feedback available.";
        return;
      }

      // Populate the feedback table with the fetched feedback data
      feedbacks.forEach((feedback) => {
        const row = feedbackTable.insertRow();
        row.insertCell(0).textContent = feedback.customer_name; // Customer name
        row.insertCell(1).textContent = feedback.feedback; // Feedback content
        row.insertCell(2).textContent = feedback.created_at; // Timestamp
      });
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  }

  // Function to fetch and display all bookings
  async function fetchBookings() {
    try {
      const response = await fetch("http://localhost:3000/api/bookings"); // Fetch booking data
      const bookings = await response.json(); // Parse the JSON response

      bookingsTable.innerHTML = ""; // Clear the table before inserting new data

      if (bookings.length === 0) {
        const row = bookingsTable.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 6; // Adjust to match the number of columns in the table
        cell.textContent = "No bookings available.";
        return;
      }

      // Populate the bookings table with the fetched booking data
      bookings.forEach((booking) => {
        const row = bookingsTable.insertRow();
        row.insertCell(0).textContent = booking.id; // Booking ID
        row.insertCell(1).textContent = booking.name; // Customer name
        row.insertCell(2).textContent = booking.service; // Service type
        row.insertCell(3).textContent = booking.date; // Appointment date
        row.insertCell(4).textContent = booking.time; // Appointment time
        row.insertCell(5).textContent = booking.staff || "Unassigned"; // Assigned Staff
      });
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  }

  // Function to generate a report (Bookings or Feedback Report)
  async function generateReport(reportType) {
    const content = `This is a ${reportType} report.`; // Basic report content (you can customize further)

    try {
      const response = await fetch("http://localhost:3000/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ report_type: reportType, content: content }),
      });

      if (response.ok) {
        reportResponse.textContent = `${reportType} Report generated successfully!`;
        fetchReports(); // Refresh the reports table after a new report is generated
      } else {
        reportResponse.textContent = "Error generating report.";
      }
    } catch (error) {
      console.error("Error generating report:", error);
      reportResponse.textContent = "Error generating report.";
    }
  }

  // Function to fetch and display all generated reports
  async function fetchReports() {
    try {
      const response = await fetch("http://localhost:3000/api/reports"); // Fetch reports data
      const reports = await response.json(); // Parse the JSON response

      reportsTable.innerHTML = ""; // Clear the table before inserting new data

      if (reports.length === 0) {
        const row = reportsTable.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 3;
        cell.textContent = "No reports available.";
        return;
      }

      // Populate the reports table with the fetched reports data
      reports.forEach((report) => {
        const row = reportsTable.insertRow();
        row.insertCell(0).textContent = report.report_type; // Report type (Bookings/Feedback)
        row.insertCell(1).textContent = report.content; // Report content
        row.insertCell(2).textContent = report.created_at; // Timestamp when the report was created
      });
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  }

  // Event listener for report generation
  generateReportForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const reportType = document.getElementById("reportType").value; // Get selected report type
    generateReport(reportType); // Call the function to generate the selected report
  });

  // Fetch and display data when the page loads
  fetchFeedback();
  fetchBookings();
  fetchReports();
});
