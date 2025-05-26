// src/pages/Search.jsx
import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const walkersData = [
  {
    id: 1,
    name: "Nikta Dovnich",
    area: "Śródmieście",
    price: 40,
    experience: "2 years",
    image: "/public/man.png",
  },
  {
    id: 2,
    name: "Piotr Kowalski",
    area: "Krzyki",
    price: 50,
    experience: "4 years",
    image: "/public/man.png",
  },
  {
    id: 3,
    name: "Kasia Wrocławska",
    area: "Fabryczna",
    price: 35,
    experience: "1 years",
    image: "/public/women.png",
  },
  {
    id: 4,
    name: "Tomasz Zieliński",
    area: "Psie Pole",
    price: 45,
    experience: "3 years",
    image: "/public/man.png",
  },
  {
    id: 5,
    name: "Monika Stępień",
    area: "Biskupin",
    price: 60,
    experience: "5 years",
    image: "/public/women.png",
  },
  {
    id: 6,
    name: "Jakub Maj",
    area: "Ołbin",
    price: 38,
    experience: "2 years",
    image: "/public/women.png",
  },
  {
    id: 7,
    name: "Kseniya Kuchuk",
    area: "Gaj",
    price: 42,
    experience: "3 years",
    image: "/public/women.png",
  },
  {
    id: 8,
    name: "Michał Wiśniewski",
    area: "Grabiszyn",
    price: 55,
    experience: "6 years",
    image: "/public/man.png",
  },
  {
    id: 9,
    name: "Yelyzaveta Hlushchenko",
    area: "Pilczyce",
    price: 8,
    experience: "30 years",
    image: "/public/women.png",
  },
];

const Search = () => {
  const [filters, setFilters] = useState({ area: "", maxPrice: 100 });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleBookingClick = (walker) => {
    navigate("/booking", { state: { walker } });
  };

  const filteredWalkers = walkersData.filter(
    (walker) =>
      (!filters.area || walker.area === filters.area) &&
      walker.price <= filters.maxPrice
  );

  return (
    <Container className="my-4">
      <h2 className="mb-4">Find a dog walker</h2>

      <Form className="mb-4">
        <Row>
          <Col md={4}>
            <Form.Group controlId="area">
              <Form.Label>District</Form.Label>
              <Form.Select
                name="area"
                value={filters.area}
                onChange={handleChange}
              >
                <option value="">all district</option>
                <option value="Śródmieście">Śródmieście</option>
                <option value="Krzyki">Krzyki</option>
                <option value="Fabryczna">Fabryczna</option>
                <option value="Psie Pole">Psie Pole</option>
                <option value="Biskupin">Biskupin</option>
                <option value="Ołbin">Ołbin</option>
                <option value="Gaj">Gaj</option>
                <option value="Grabiszyn">Grabiszyn</option>
                <option value="Pilczyce">Pilczyce</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="price">
              <Form.Label>Max price ({filters.maxPrice} zł)</Form.Label>
              <Form.Range
                name="maxPrice"
                min="0"
                max="100"
                step="5"
                value={filters.maxPrice}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <Row>
        {filteredWalkers.map((walker) => (
          <Col md={4} key={walker.id} className="mb-4">
            <Card className="text-center">
              <Card.Img
                variant="top"
                src={walker.image}
                className="rounded-circle mx-auto mt-3"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{walker.name}</Card.Title>
                <Card.Text>
                  District: {walker.area} <br />
                  Experience: {walker.experience} <br />
                  Price: {walker.price} zł
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleBookingClick(walker)}
                >
                  Reserve
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Search;
