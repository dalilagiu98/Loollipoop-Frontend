/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchChangePasswordByUserId } from '../../redux/actions/action';

const ModalChangePassword = ({handleClose, show}) => {

    //STATE:
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")

    //DISPATCH:
    const dispatch = useDispatch()

    //FUNCTIONS:
    const handleSubmit = () => {
        dispatch(fetchChangePasswordByUserId(password))
        handleClose()
    }
    return (
        <Modal show={show} onHide={handleClose} size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered className="border border-primary">
            <Modal.Header className="bg-tertiary mb-3 border border-primary">
            <Modal.Title className="text-dark display-6">Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>Immit your new password and then repeat it.</Modal.Body>
            <Modal.Body>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">New Password:</InputGroup.Text>
                <Form.Control type='password' value={password} onChange={(e) => setPassword(e.target.value)}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Repeat New Password:</InputGroup.Text>
                <Form.Control  type='password' value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)}
                />
            </InputGroup>
            </Modal.Body>
            <Modal.Footer>
            <Button className="text-primary border border-primary fs-5 fw-medium rounded-pill px-4 shadow-sm" variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button className=" text-secondary border border-secondary fs-5 fw-medium rounded-pill px-4 shadow-sm" onClick={handleSubmit} disabled={password !== repeatPassword || password === ""}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>  
    )
}

export default ModalChangePassword