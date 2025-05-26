// src/pages/Search.jsx
import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const walkersData = [
  {
    id: 1,
    name: "Anna Nowak",
    area: "Śródmieście",
    price: 40,
    experience: "2 года",
    image: "https://www.svgrepo.com/show/493421/man-thinking.svg",
  },
  {
    id: 2,
    name: "Piotr Kowalski",
    area: "Krzyki",
    price: 50,
    experience: "4 года",
    image: "https://www.svgrepo.com/show/493421/man-thinking.svg",
  },
  {
    id: 3,
    name: "Kasia Wrocławska",
    area: "Fabryczna",
    price: 35,
    experience: "1 год",
    image: "https://www.svgrepo.com/show/493421/man-thinking.svg",
  },
  {
    id: 4,
    name: "Tomasz Zieliński",
    area: "Psie Pole",
    price: 45,
    experience: "3 года",
    image: "https://www.svgrepo.com/show/493421/man-thinking.svg",
  },
  {
    id: 5,
    name: "Monika Stępień",
    area: "Biskupin",
    price: 60,
    experience: "5 лет",
    image: "https://www.svgrepo.com/show/493421/man-thinking.svg",
  },
  {
    id: 6,
    name: "Jakub Maj",
    area: "Ołbin",
    price: 38,
    experience: "2 года",
    image: "https://www.svgrepo.com/show/493421/man-thinking.svg",
  },
  {
    id: 7,
    name: "Zuzanna Kaczmarek",
    area: "Gaj",
    price: 42,
    experience: "3 года",
    image: "https://www.svgrepo.com/show/493421/man-thinking.svg",
  },
  {
    id: 8,
    name: "Michał Wiśniewski",
    area: "Grabiszyn",
    price: 55,
    experience: "6 лет",
    image: "https://www.svgrepo.com/show/493421/man-thinking.svg",
  },
  {
    id: 9,
    name: "Natalia Jankowska",
    area: "Pilczyce",
    price: 48,
    experience: "4 года",
    image: "https://www.svgrepo.com/show/493421/man-thinking.svg",
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
      <h2 className="mb-4">Найти выгуливателя</h2>

      <Form className="mb-4">
        <Row>
          <Col md={4}>
            <Form.Group controlId="area">
              <Form.Label>Район</Form.Label>
              <Form.Select
                name="area"
                value={filters.area}
                onChange={handleChange}
              >
                <option value="">Все районы</option>
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
              <Form.Label>Макс. цена ({filters.maxPrice} zł)</Form.Label>
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
            <Card>
              <Card.Img variant="top" src={walker.image} />
              <Card.Body>
                <Card.Title>{walker.name}</Card.Title>
                <Card.Text>
                  Район: {walker.area} <br />
                  Опыт: {walker.experience} <br />
                  Цена: {walker.price} zł
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleBookingClick(walker)}
                >
                  Забронировать
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
