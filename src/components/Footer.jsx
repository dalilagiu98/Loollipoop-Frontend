import { Button, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FaGithub } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa6";

const Footer = () => {
    return(
        <Container fluid style={{background: "linear-gradient(rgba(247, 245, 238, 0.07), rgba(247, 245, 238, 0.5),rgba(247, 245, 238, 0.7),rgba(247, 245, 238, 0.9), rgba(247, 245, 238, 1))"}} className="py-3">
            <Row className="justify-content-around py-4 mt-4">
                <Col className="h-100">
                    <div className="d-flex justify-content-center align-items-center">
                        <img src="logoname.png" alt="logo-name" style={{height: "5em"}}/>
                    </div>
                </Col>

                <Col>
                    <div className="d-flex flex-column align-items-center">
                        <h4 className="text-dark fw-bold fs-5">Loollipoop</h4>
                        <Link to="/" className="text-primary fw-medium">About us</Link>
                        <Link to="/" className="text-primary fw-medium text-center">Leave us a feedback</Link>
                    </div>
                </Col>

                <Col>
                <div className="d-flex flex-column align-items-center">
                    <h4 className="text-dark fw-bold fs-5">Help</h4>
                    <Link to="/registration" className="text-primary fw-medium">Sign up</Link>
                    <Link to="/login" className="text-primary fw-medium">Sign in</Link>
                </div>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <div className="d-flex justify-content-evenly ">
                        <Button variant="outline-dark border-0 rounded-circle" href="https://github.com/dalilagiu98" className="hovered-button">
                            <FaGithub className="fs-1"/> 
                        </Button>
                        <Button variant="outline-dark border-0 rounded-circle" href="https://www.linkedin.com/in/dalilagiurgola/" className="hovered-button">
                            <FaLinkedinIn className="fs-1"/>
                        </Button>
                        <Button variant="outline-dark border-0 rounded-circle" href="https://discord.com/channels/@me" className="hovered-button">
                            <FaDiscord className="fs-1"/>   
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="d-flex justify-content-center mt-4">
                        <p className="text-dark fw-medium"> &copy; Loollipoop, {new Date().getFullYear()}. All rights reserved. </p>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer