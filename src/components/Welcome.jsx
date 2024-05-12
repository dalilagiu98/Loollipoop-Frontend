import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row"
import Card from 'react-bootstrap/Card';
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Welcome = function () {

    return (
        <Row className="flex-grow-1 align items-center">
            <Col xs={12} md={7}>
                <Card  className="bg-transparent border-0">
                    <Card.Body>
                        <Card.Title className="fw-bold fs-1">Entra in una delle più innovative community al mondo.</Card.Title>
                        <Card.Text className="fs-5">
                            Unisciti e vivi l&apos;esperienza come Host o Guest.
                        </Card.Text>
                        <Container fluid className="p-0">
                            <Row className="justify-content-">
                                <Col>
                                    <Link to="/login" className="btn btn-success card-link rounded-pill w-100 btn-outline-primary text-black">Login</Link>
                                </Col>
                                <Col>
                                    <Link to="/registration" className="btn btn-primary card-link rounded-pill w-100 border -success">Registrati</Link>
                                </Col>
                            </Row>
                        </Container>


                    </Card.Body>
                </Card>           
            </Col>
            <Col className="d-none d-md-block">
                <div className="d-flex h-100 w-100 align-items-center justify-content-center">
                    <img src="/logoname.png" alt="logo-name" className="z-1" style={{width: '20em'}}/>
                </div>

            </Col>
    
        </Row>
    )
}

export default Welcome