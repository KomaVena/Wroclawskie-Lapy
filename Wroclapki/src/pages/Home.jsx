import React from "react";
import { Carousel, Card, Container, Row, Col } from "react-bootstrap";

export default function Home() {
  return (
    <Container className="mt-4">
      <div className="text-center mb-5">
        <h1 className="mb-3">Welcome to Wroclapki🐾</h1>
        <p className="lead">
          Wroclapki is a modern online service for pet owners in Wroclaw. We
          help find trusted and caring dog walkers to whom you can trust your
          four-legged friend.
        </p>
        <p>
          Whatever your schedule - whether it's late work or vacation - our team
          is always there to keep your pets happy and content. Easy search,
          online booking and customer reviews - all for your peace of mind.
        </p>
      </div>

      {/* Карусель */}
      <div className="mx-auto" style={{ width: "600px" }}>
        <Carousel fade className="mb-5">
          <Carousel.Item interval={3000}>
            <img
              className="d-block w-100 rounded"
              src="/public/img_1.jpg"
              alt="Собака на прогулке"
            />
            <Carousel.Caption>
              <h5>Happy walks 🦮</h5>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img
              className="d-block w-100 rounded"
              src="/public/img_2.jpg"
              alt="Прогулка в парке"
            />
            <Carousel.Caption>
              <h5>Care and attention ❤️</h5>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img
              className="d-block w-100 rounded"
              src="/public/img_3.jpg"
              alt="Собака и выгульщик"
            />
            <Carousel.Caption>
              <h5>Verified dog walkers ⭐</h5>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      {/* Карточки */}
      <div className="w-75 mx-auto mb-5">
        <h3 className="text-center mb-4">Our advantages</h3>
        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 shadow">
              <Card.Body>
                <Card.Title>Services 🛠️</Card.Title>
                <Card.Text>
                  Individual and group walks, walking services at any time of
                  the day, timed booking.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow">
              <Card.Body>
                <Card.Title>Customer Reviews 💬</Card.Title>
                <Card.Text>
                  Read real reviews from pet owners and choose a dog walker that
                  others trust.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow">
              <Card.Body>
                <Card.Title>Safety 🛡️</Card.Title>
                <Card.Text>
                  All dog walkers are checked. We guarantee reliability and care
                  for your pet.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
