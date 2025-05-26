import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  ListGroup,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../services/firebase";

const Reviews = () => {
  const { user } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [selectedRating, setSelectedRating] = useState(0); // рейтинг по умолчанию
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "Reviews"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const reviewsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(reviewsList);
    } catch (err) {
      console.error("Ошибка при загрузке отзывов:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("Вы должны быть авторизованы, чтобы оставить отзыв.");
      return;
    }
    if (!newReview.trim()) {
      setError("Отзыв не может быть пустым.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "Reviews"), {
        author: user.email,
        authorId: user.uid,
        text: newReview.trim(),
        rating: selectedRating,
        createdAt: serverTimestamp(),
      });
      setNewReview("");
      setSelectedRating(5);
      setError("");
      fetchReviews();
    } catch (err) {
      console.error("Ошибка при добавлении отзыва:", err);
      setError("Не удалось добавить отзыв. Попробуйте позже.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Reviews", id));
      setReviews(reviews.filter((rev) => rev.id !== id));
    } catch (err) {
      console.error("Ошибка при удалении отзыва:", err);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < rating ? "#ffc107" : "#e4e5e9" }}>
        ★
      </span>
    ));
  };

  return (
    <Container className="my-4">
      <h2>Отзывы</h2>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <ListGroup className="mb-4">
          {reviews.map((rev) => (
            <ListGroup.Item key={rev.id}>
              <strong>{rev.author}:</strong> {rev.text}
              <div>{renderStars(rev.rating)}</div>
              {user && user.uid === rev.authorId && (
                <Button
                  variant="danger"
                  size="sm"
                  className="mt-2"
                  onClick={() => handleDelete(rev.id)}
                >
                  Удалить
                </Button>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {user ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="reviewText" className="mb-3">
            <Form.Label>Оставить отзыв</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Напишите ваш отзыв..."
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Оценка</Form.Label>
            <div style={{ fontSize: "1.5rem" }}>
              {[1, 2, 3, 4, 5].map((val) => (
                <span
                  key={val}
                  onClick={() => setSelectedRating(val)}
                  style={{
                    cursor: "pointer",
                    color: val <= selectedRating ? "#ffc107" : "#e4e5e9",
                    transition: "color 0.2s",
                  }}
                  title={`${val} звёзд`}
                >
                  ★
                </span>
              ))}
            </div>
          </Form.Group>

          {error && <Alert variant="danger">{error}</Alert>}
          <Button type="submit">Добавить отзыв</Button>
        </Form>
      ) : (
        <Alert variant="info">Войдите в систему, чтобы оставить отзыв.</Alert>
      )}
    </Container>
  );
};

export default Reviews;
