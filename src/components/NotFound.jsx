import { Col, Container, Row } from "react-bootstrap"

const NotFound = () => {
    return (
        <Container fluid className="h-100 flex-grow-1 ">
            <Row className="h-100 text-center mt-5">
                <Col xs={12}>
                    <h1 className="display-4 fw-medium text-dark mt-5">Whoopsie!  </h1>
                    <h1 className="fw-medium text-dark">Looks like you&apos;ve stepped in a digital pile of 404! Time to wipe that browser history and try a different route.</h1>
                    <div>
                        <img src="404.png" alt="not-found" style={{width: "20em"}} />
                    </div>  
                </Col>
            </Row>
        </Container>
    )
}

export default NotFound