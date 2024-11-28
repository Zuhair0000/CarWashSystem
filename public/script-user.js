document.addEventListener("DOMContentLoaded", async () => {
  // Get DOM elements
  const bookingForm = document.getElementById("bookingForm");
  const feedbackForm = document.getElementById("feedbackForm");
  const bookingResponse = document.getElementById("bookingResponse");
  const feedbackResponse = document.getElementById("feedbackMessage");
  const serviceSelect = document.getElementById("service");

  // Fetch available services and populate the dropdown
  try {
    const servicesResponse = await fetch("/api/services");
    const services = await servicesResponse.json();

    if (services.length > 0) {
      services.forEach((service) => {
        const option = document.createElement("option");
        option.value = service.id;
        option.textContent = `${service.name} - $${service.price}`;
        serviceSelect.appendChild(option);
      });
    } else {
      const option = document.createElement("option");
      option.textContent = "No services available";
      option.disabled = true;
      serviceSelect.appendChild(option);
    }
  } catch (error) {
    console.error("Error fetching services:", error);
    bookingResponse.textContent = "Error loading services.";
  }

  // Handle the booking form submission
  bookingForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const service_id = serviceSelect.value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, service_id, date, time }),
    });

    if (response.ok) {
      bookingResponse.textContent = "Booking successfully created!";
      bookingForm.reset();
    } else {
      bookingResponse.textContent = "Error creating booking.";
    }
  });

  // Handle feedback form submission
  feedbackForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const feedbackMessage = feedbackResponse.value;

    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_name: "Customer",
        feedback: feedbackMessage,
      }),
    });

    if (response.ok) {
      feedbackResponse.textContent = "Thank you for your feedback!";
      feedbackForm.reset();
    } else {
      feedbackResponse.textContent = "Error submitting feedback.";
    }
  });
});
