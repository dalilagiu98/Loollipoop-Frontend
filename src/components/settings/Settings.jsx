import { useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import ModalDeleteProfile from "./ModalDeleteProfile";

const Settings = () => {

    //STATE:
    const [show, setShow] = useState(false);

    //FUNCTIONS:
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <Container style={{marginTop: "5em", marginBottom: "7em"}}>
            <Row>
                <Col>
                    <h1 className="display-1 fw-medium text-center text-md-end">Settings</h1>
                </Col>
            </Row>
            <Row className="bg-white rounded shadow-lg mt-3 align-items-center p-4">
                <Col>
                    <div className="d-flex justify-content-center ">
                        <img src="logoname.png" alt="logo-name" style={{width:"26em"}}/>
                    </div>
                </Col>
                <Col>
                    <div className="d-flex flex-column border-primary h-100" style={{borderStyle: "dashed"}}>
                        <div className="d-flex align-items-center p-5">
                            <img src="logo.png" alt="logo" style={{height: "3.8em"}}/>
                            <h3 className="text-dark" style={{cursor: "pointer"}}><u>Change password</u></h3>
                        </div>
                        <div className="d-flex align-items-center p-5">
                            <img src="logo.png" alt="logo" style={{height: "3.8em"}}/>
                            <h3 className="text-dark" style={{cursor: "pointer"}} onClick={handleShow}><u>Delete profile</u></h3>
                            {
                                show && <ModalDeleteProfile handleClose={handleClose} show={show}/>
                            }
                        </div>   
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Settings