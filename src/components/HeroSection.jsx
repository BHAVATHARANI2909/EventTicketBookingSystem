import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Modal,
  TextField,
  Divider,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import adminimg from "../assets/admin.jpg";
import rock from "../assets/rock.jpg";
import jazz from "../assets/jazz.jpg";
import tech from "../assets/tech.jpg";
import art from "../assets/art.jpeg";

const HeroSection = () => {
  const events = [
    {
      id: 1,
      title: "Rock Music Festival",
      description: "Top rock bands live!",
      image: rock

    },
    {
      id: 2,
      title: "Jazz Night",
      description: "Smooth jazz performances.",
      image: jazz
    },
    {
      id: 3,
      title: "Tech Conference",
      description: "Latest in tech and innovation.",
      image: tech
    },
    {
      id: 4,
      title: "Art Expo",
      description: "Exhibition of modern art.",
      image: art
    },
 

  ];

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    number: "",
    cardno: "",
    expriedate: "",
    cvv: "",
  });
  const [showTicket, setShowTicket] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const openForm = (event) => {
    setSelectedEvent(event);
    setFormData({
      username: "",
      email: "",
      number: "",
      cardno: "",
      expriedate: "",
      cvv: "",
    });
    setShowTicket(false);
    setErrorMsg("");
  };

  const closeForm = () => {
    setSelectedEvent(null);
    setShowTicket(false);
    setErrorMsg("");
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const { username, email, number, cardno, expriedate, cvv } = formData;

    if (!username || !email || !number || !cardno || !expriedate || !cvv) {
      setErrorMsg("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/saveUser", {
        eventId: selectedEvent?.id,
        ...formData,
      });

      if ([200, 201].includes(res.status)) {
        setShowTicket(true);
      } else {
        setErrorMsg("Booking failed. Try again.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      setErrorMsg("Server error. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 8,
        background: "url('bg3.jpg') center/cover",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          fontWeight="bold"
          color="white"
          textAlign="center"
          mb={6}
        >
          Book Your Favorite Events
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 4,
          }}
        >
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Paper
                elevation={6}
                sx={{
                  height: 400,
                  borderRadius: 3,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  position: "relative",
                }}
              >
                <img
                  src={event.image} // this will work for each imported image
                  alt={event.title}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                  }}
                />
                <Box
                  sx={{
                    background: "rgba(0,0,0,0.65)",
                    p: 3,
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  <Typography variant="h5" color="white" fontWeight="bold">
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="white" sx={{ mb: 2 }}>
                    {event.description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => openForm(event)}
                  >
                    Book Now
                  </Button>
                </Box>
              </Paper>

            </motion.div>
          ))}
        </Box>
      </Container>

      <Modal
        open={!!selectedEvent}
        onClose={closeForm}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Paper
          sx={{
            p: 4,
            width: { xs: "90%", sm: 400 },
            borderRadius: 3,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
          elevation={12}
        >
          {showTicket ? (
            <>
              <Typography
                variant="h5"
                fontWeight="bold"
                textAlign="center"
                gutterBottom
                sx={{
                  color: "white",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
                }}
              >
                🎟 Your Ticket is Confirmed!
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography
                sx={{
                  color: "white",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
                }}
              >
                <strong>Username:</strong> {formData.username}
              </Typography>
              <Typography
                sx={{
                  color: "white",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
                }}
              >
                <strong>Email:</strong> {formData.email}
              </Typography>
              <Typography
                sx={{
                  color: "white",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
                }}
              >
                <strong>Phone:</strong> {formData.number}
              </Typography>
              <Typography
                sx={{
                  color: "white",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
                }}
              >
                <strong>Event:</strong> {selectedEvent?.title}
              </Typography>
              <Typography
                sx={{
                  mt: 1,
                  color: "white",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
                }}
              >
                <strong>Card:</strong> **** **** **** {formData.cardno.slice(-4)}
              </Typography>

              <Button
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 3 }}
                onClick={closeForm}
              >
                Close
              </Button>
            </>
          ) : (
            <>
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{
                  color: "white",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
                }}
              >
                Book for: {selectedEvent?.title}
              </Typography>

              {errorMsg && (
                <Typography color="error" sx={{ mb: 2 }}>
                  {errorMsg}
                </Typography>
              )}

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  required
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  required
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  required
                />
                <TextField
                  fullWidth
                  label="Card Number"
                  name="cardno"
                  value={formData.cardno}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  required
                />
                <TextField
                  fullWidth
                  label="Expiry Date (MM/YY)"
                  name="expriedate"
                  value={formData.expriedate}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  required
                />
                <TextField
                  fullWidth
                  label="CVV"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  sx={{ mb: 3 }}
                  required
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Confirm Booking"
                  )}
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Modal>
    </Box>
  );
};

export default HeroSection;
