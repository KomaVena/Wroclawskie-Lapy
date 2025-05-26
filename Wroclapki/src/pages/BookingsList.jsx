import React, { useEffect, useState } from "react";
import { Container, Table, Spinner, Alert, Button } from "react-bootstrap";
import { db } from "../services/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "bookings"));
      const bookingsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookings(bookingsData);
      setLoading(false);
    } catch (err) {
      setError("Ошибка при загрузке бронирований");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "bookings", id));
      // Обновляем список после удаления
      setBookings(bookings.filter((booking) => booking.id !== id));
    } catch (err) {
      alert("Ошибка при удалении бронирования");
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container>
      <h2>Список бронирований</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Выгуливатель</th>
            <th>Дата</th>
            <th>Время</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center">
                Нет бронирований
              </td>
            </tr>
          )}
          {bookings.map(({ id, name, walkerName, date, time }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{walkerName}</td>
              <td>{date}</td>
              <td>{time}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(id)}
                >
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default BookingsList;
