import { useEffect, useState } from "react";

function App() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchEvents = () => {
    fetch("http://localhost:5000/events")
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleTicketClick = (event) => {
    setSelectedEvent(event);
    setSuccessMessage("");
  };

  const submitLead = async () => {
    if (!email || !consent) {
      alert("Please enter email and accept consent.");
      return;
    }

    await fetch("http://localhost:5000/leads/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        consent,
        eventId: selectedEvent._id
      })
    });

    setSuccessMessage("Thank you! Your details have been saved.");
    setEmail("");
    setConsent(false);
  };

  return (
    <div style={{
      fontFamily: "Inter, sans-serif",
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      minHeight: "100vh",
      padding: "60px 20px"
    }}>

      <h1 style={{
        textAlign: "center",
        color: "white",
        marginBottom: "50px",
        fontSize: "42px",
        fontWeight: "700"
      }}>
        Sydney Events
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "30px",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        {events.map((event) => (
          <div
            key={event._id}
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "25px",
              boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow =
                "0 25px 50px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.boxShadow =
                "0 15px 40px rgba(0,0,0,0.15)";
            }}
          >

            <h3 style={{
              marginBottom: "10px",
              fontSize: "20px",
              fontWeight: "600"
            }}>
              {event.title}
            </h3>

            <p style={{ color: "#666", marginBottom: "8px" }}>
              {event.dateTime}
            </p>

            <p style={{ color: "#888", marginBottom: "15px" }}>
              {event.venue}
            </p>

            <span style={{
              display: "inline-block",
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              marginBottom: "15px",
              background: "#f0f0f0",
              color: "#555"
            }}>
              {event.status}
            </span>

            <button
              onClick={() => handleTicketClick(event)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "12px",
                border: "none",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                color: "white",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              GET TICKETS
            </button>

          </div>
        ))}
      </div>

      {selectedEvent && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.6)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div style={{
            background: "white",
            padding: "30px",
            borderRadius: "15px",
            width: "350px"
          }}>
            <h3 style={{ marginBottom: "15px" }}>Enter Email</h3>

            {successMessage && (
              <p style={{ color: "green", marginBottom: "10px" }}>
                {successMessage}
              </p>
            )}

            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
                border: "1px solid #ddd"
              }}
            />

            <div style={{ marginBottom: "15px" }}>
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />{" "}
              I agree to receive updates
            </div>

            <button
              onClick={submitLead}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "10px",
                border: "none",
                background: "#667eea",
                color: "white",
                fontWeight: "600",
                marginBottom: "10px"
              }}
            >
              Submit
            </button>

            <button
              onClick={() => setSelectedEvent(null)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                background: "white"
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;