import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setError("The passwords do not match");
      return;
    }

    try {
      await register(email, password);
      navigate("/search");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card style={{ maxWidth: "400px", width: "100%" }}>
        <Card.Body>
          <h3 className="text-center mb-4">Registration in Wroclapki</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPasswordConfirm" className="mb-3">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Repeat password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
          </Form>

          <div className="text-center mt-3">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
