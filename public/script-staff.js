document.addEventListener("DOMContentLoaded", async () => {
  const bookingsTable = document
    .getElementById("bookingsTable")
    .getElementsByTagName("tbody")[0];

  // Fetch and display bookings with staff assignments
  async function fetchBookings() {
    try {
      const response = await fetch("http://localhost:3000/api/bookings");
      const bookings = await response.json();

      bookingsTable.innerHTML = ""; // Clear the table

      if (bookings.length === 0) {
        const row = bookingsTable.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 6;
        cell.textContent = "No bookings available.";
        return;
      }

      bookings.forEach((booking) => {
        const row = bookingsTable.insertRow();
        row.insertCell(0).textContent = booking.id; // Booking ID
        row.insertCell(1).textContent = booking.name; // Customer Name
        row.insertCell(2).textContent = booking.service; // Service
        row.insertCell(3).textContent = booking.date; // Date
        row.insertCell(4).textContent = booking.time; // Time
        row.insertCell(5).textContent = booking.staff || "Unassigned"; // Assigned Staff
      });
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  }

  // Fetch bookings when the page loads
  fetchBookings();
});
