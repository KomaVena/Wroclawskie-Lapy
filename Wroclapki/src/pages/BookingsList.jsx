import React, { useEffect, useState } from "react";
import { Container, Table, Spinner, Alert, Button } from "react-bootstrap";
import { db } from "../services/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setError("User is not authorized");
        setLoading(false);
        return;
      }

      const q = query(
        collection(db, "bookings"),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      const bookingsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookings(bookingsData);
      setLoading(false);
    } catch (err) {
      setError("Error loading reservations");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "bookings", id));
      setBookings(bookings.filter((booking) => booking.id !== id));
    } catch (err) {
      alert("Error deleting booking");
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container>
      <h2>My bookings</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>🐶</th>
            <th>Pets walker</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center">
                No reservations
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
                  Delete
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
