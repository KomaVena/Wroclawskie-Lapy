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
      console.error("Error loading reviews:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to leave a review..");
      return;
    }
    if (!newReview.trim()) {
      setError("The review cannot be empty.");
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
      console.error("Error adding review:", err);
      setError("Failed to add review. Try again later..");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Reviews", id));
      setReviews(reviews.filter((rev) => rev.id !== id));
    } catch (err) {
      console.error("Error deleting review:", err);
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
      <h2>Reviews</h2>

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
                  Delete
                </Button>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {user ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="reviewText" className="mb-3">
            <Form.Label>Leave a review</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Write your review..."
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Grade</Form.Label>
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
                  title={`${val} stars`}
                >
                  ★
                </span>
              ))}
            </div>
          </Form.Group>

          {error && <Alert variant="danger">{error}</Alert>}
          <Button type="submit">Add a review</Button>
        </Form>
      ) : (
        <Alert variant="info">Please sign in to leave a review.</Alert>
      )}
    </Container>
  );
};

export default Reviews;
