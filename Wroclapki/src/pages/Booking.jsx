// src/pages/Booking.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebase";

import { useAuth } from "../context/AuthContext"; // если есть контекст с юзером

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Получаем переданного выгуливателя из Search
  const selectedWalker = location.state?.walker;

  const { user } = useAuth();

  // Данные для брони
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (!selectedWalker) {
      // Если не выбрали выгуливателя, переадресуем обратно в поиск
      navigate("/search");
    }
  }, [selectedWalker, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !time) {
      alert("Пожалуйста, выберите дату и время");
      return;
    }

    try {
      await addDoc(collection(db, "bookings"), {
        walkerId: selectedWalker.id,
        walkerName: selectedWalker.name,
        userId: user.uid,
        userEmail: user.email,
        date,
        time,
        createdAt: new Date(),
      });
      alert("Спасибо! Ваше бронирование успешно отправлено.");
      navigate("/search"); // или куда хочешь после успешного бронирования
    } catch (error) {
      console.error("Ошибка при отправке бронирования:", error);
      alert("Ошибка при отправке бронирования.");
    }
  };

  if (!selectedWalker) return null;

  return (
    <Container className="my-4">
      <h2>Бронирование с {selectedWalker.name}</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Дата</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Время</Form.Label>
          <Form.Control
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit">Забронировать</Button>
      </Form>
    </Container>
  );
};

export default Booking;
