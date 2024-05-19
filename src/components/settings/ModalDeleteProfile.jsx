import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { fetchDeleteUser } from '../../redux/actions/action';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const ModalDeleteProfile = ({ show, handleClose}) => {

    //STATE:
    const[isRadioSelected, setIsRadioSelected] = useState(false)

    //DISPATCH:
    const dispatch = useDispatch()

    //NAVIGATE:
    const navigate = useNavigate()

    //FUNCTIONS:
    const handleRadioChange = () => {
        setIsRadioSelected(!isRadioSelected);
    };

    const handleSubmit = () => {
        dispatch(fetchDeleteUser())
        navigate("/welcome")
    }
    return (
        <Modal show={show} onHide={handleClose}size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered className="border border-primary">
            <Modal.Header className="bg-tertiary mb-3 border border-primary">
            <Modal.Title className="text-dark display-6">Delete profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>This operation will <strong>delete</strong> the user. Are you sure you want to proceed?</Modal.Body>
            <Modal.Body>
            <div className='d-flex align-items-center '>
                <input type="radio" className='form-check-info radio-label' required checked={isRadioSelected}
                onChange={handleRadioChange}/>
                <h6 className='d-inline ms-2 fw-light mb-0'>Yes, I want to proceed to delete my profile</h6>
            </div>

            </Modal.Body>
            <Modal.Footer>
            <Button className="text-primary border border-primary fs-5 fw-medium rounded-pill px-4 shadow-sm" variant="secondary" onClick={handleClose}>
                Not now
            </Button>
            <Button className=" text-secondary border border-secondary fs-5 fw-medium rounded-pill px-4 shadow-sm" onClick={handleSubmit} disabled={!isRadioSelected}>
                Delete
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDeleteProfile