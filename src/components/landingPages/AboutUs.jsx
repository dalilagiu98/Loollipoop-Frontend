import { Col, Container, Row } from "react-bootstrap"

const AboutUs = () => {
    return (
        <Container style={{marginTop: "5em", marginBottom:"7em"}}>
            <Row>
                <Col>
                    <h1 className="display-1 fw-medium text-center text-md-end">About Us</h1>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col xs={12} md={6}>
                    <div>
                        <img src="/logoname.png" alt="logoname" style={{widht: "10em"}} className="img-fluid"/>
                    </div>
                </Col>
                <Col xs={12}  md={6}>
                    <h2 className="fw-medium text-dark fs-1 mt-3">Why We Started</h2>
                    <p className="fs-5">The idea for our platform came from the need for a dependable network of bathrooms that are likely to be clean and readily available. Unlike public restrooms or those in cafes and restaurants, our bathrooms do not require any purchase, making them a convenient and user-friendly option.

                    Join us in creating a community where bathroom access is easy, clean, and beneficial for everyone involved.</p>
                </Col>
            </Row>
        </Container>
    )
}

export default AboutUs