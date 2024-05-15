import { useState } from "react";
import { Col, Row, Container, Button } from "react-bootstrap"
import { FaPlus } from "react-icons/fa";
import AddingLooModal from "./AddingLooModal";

const MyLoo = () => {

    //STATE:
    const [show, setShow] = useState(false)

    //FUNCTIONS:
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <Row>
                <Col>
                    <h1 className="display-1 fw-medium text-center text-md-start">Your Loos</h1>
                </Col>
            </Row>
            <Row className="bg-white rounded shadow-lg p-4">
                <Col xs={12} className="bg-tertiary rounded shadow-sm p-2">
                    <Container>
                        <Row>
                            <Col>
                                <Button variant="outline-primary" className="hovered-button"><FaPlus style={{fontSize: "10em"}} onClick={handleShow}/></Button>
                                {
                                    show && <AddingLooModal show={show} handleClose={handleClose}/>
                                }
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </>    
    )
}

export default MyLoo