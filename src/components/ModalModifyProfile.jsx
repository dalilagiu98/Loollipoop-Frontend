import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import InputGroup from 'react-bootstrap/InputGroup';
import { Col, Container, Row } from 'react-bootstrap';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchPersonalProfile } from '../redux/actions/action';

// eslint-disable-next-line react/prop-types
const ModalModifyProfile = ({ handleClose, show}) => {

    //SELECTOR:
    const userName = useSelector((state) => {
        return state.getPersonalProfile.userLogged.name
    })
    const userSurname = useSelector((state) => {
        return state.getPersonalProfile.userLogged.surname
    })


    //DISPATCH:
    const dispatch = useDispatch();

    //STATE:
    const [inputForm, setInputForm] = useState({
        name: userName,
        surname: userSurname
    })
    const [isUploading, setIsUploading] = useState(false)
    const [isUploaded, setIsUploaded] = useState(false);
    const [isError, setIsError] = useState(false);

    //FUNCTIONS:
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true)
        let token = localStorage.getItem("accessToken");
        try {
            let response = await fetch("http://localhost:3001/users/me", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(inputForm)
            })

            if(response.ok) {
                let data = await response.json();
                console.log(data);
                setIsUploading(false)
                setIsUploaded(true)
                dispatch(fetchPersonalProfile())
            } else {
                setIsUploading(false)
                setIsError(true);
                throw new Error("Error in upload profile informations")
            }
        } catch (err) {
            console.log(err)
        }
    }

console.log(inputForm.name)
console.log(inputForm.surname)

    return (
        <Modal show={show} onHide={handleClose} size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered className="border border-primary">
            <Modal.Header className="bg-tertiary mb-3 border border-primary">
            <Modal.Title className="text-dark display-6">Modify personal informations</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Container>
                    <Row className='justify-content-center mb-3'>
                        <Col xs={10}>
                            <p className="text-primary fw-medium mb-2 text-center">Change the information you want to modify and then save:</p>
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col xs={8}>
                            <Form>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                    placeholder="Name..."
                                    aria-label="Name..."
                                    aria-describedby="basic-addon1"
                                    value={inputForm.name}
                                    onChange={(e) => setInputForm({
                                        ...inputForm,
                                        name: e.target.value
                                    })}
                                    />
                                </InputGroup> 
                                <InputGroup className="mb-3">
                                    <Form.Control
                                    placeholder="Surname..."
                                    aria-label="Surname..."
                                    aria-describedby="basic-addon1"
                                    value={inputForm.surname}
                                    onChange={(e) => setInputForm({
                                        ...inputForm,
                                        surname: e.target.value
                                    })}
                                    />
                                </InputGroup>
                            </Form>    
                        </Col>
                    </Row>
                </Container>
                
            </Modal.Body>

            <Modal.Footer>
                {
                    isUploading && <Spinner animation="border" size="sm" variant="primary"/>
                }
                {
                    !isUploading && isUploaded && !isError && <h6 className="text-dark fw-medium">Uploaded!</h6>
                }
                {
                    !isUploading && isError && <h6 className="text-dark fw-medium">Error to upload file!</h6>
                }
                <Button className="text-primary border border-primary fs-5 fw-medium rounded-pill px-4 shadow-sm" variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button className=" text-secondary border border-secondary fs-5 fw-medium rounded-pill px-4 shadow-sm" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
      </Modal>   
    )
}

export default ModalModifyProfile