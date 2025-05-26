import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebase";

import { useAuth } from "../context/AuthContext";

import emailjs from "emailjs-com";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedWalker = location.state?.walker;
  const { user } = useAuth();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (!selectedWalker) {
      navigate("/search");
    }
  }, [selectedWalker, navigate]);

  // Отправка email клиенту
  const sendEmailToClient = (bookingData) => {
    emailjs
      .send(
        "service_oeeovhy",
        "template_pobe5o2",
        {
          name: user.displayName || "Клиент",
          client_email: bookingData.userEmail,
          walker_name: bookingData.walkerName,
          booking_date: bookingData.date,
          booking_time: bookingData.time,
        },
        "X_wcCL0KW8SXVu1TA"
      )
      .then(
        (result) => {
          console.log("Email to client sent:", result.text);
        },
        (error) => {
          console.error("Email to client error:", error.text);
        }
      );
  };

  // Отправка email выгуливателю
  const sendEmailToWalker = (bookingData) => {
    emailjs
      .send(
        "service_oeeovhy",
        "template_bvotrej",
        {
          walker_name: bookingData.walkerName,
          booking_date: bookingData.date,
          booking_time: bookingData.time,
          client_email: bookingData.userEmail,
        },
        "X_wcCL0KW8SXVu1TA"
      )
      .then(
        (result) => {
          console.log("Email to walker sent:", result.text);
        },
        (error) => {
          console.error("Email to walker error:", error.text);
        }
      );
  };
  console.log("User email:", user.email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !time) {
      alert("Please select date and time");
      return;
    }

    try {
      const bookingData = {
        walkerId: selectedWalker.id,
        walkerName: selectedWalker.name,
        userId: user.uid,
        userEmail: user.email,
        date,
        time,
        createdAt: new Date(),
      };

      await addDoc(collection(db, "bookings"), bookingData);

      // Отправляем два письма
      sendEmailToClient(bookingData);
      sendEmailToWalker(bookingData);

      alert("Thank you! Your reservation has been sent successfully.");
      navigate("/search");
    } catch (error) {
      console.error("Error sending booking:", error);
      alert("Error sending booking.");
    }
  };

  if (!selectedWalker) return null;

  return (
    <Container className="my-4">
      <h2>Booking with {selectedWalker.name}</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit">Book now</Button>
      </Form>
    </Container>
  );
};

export default Booking;
