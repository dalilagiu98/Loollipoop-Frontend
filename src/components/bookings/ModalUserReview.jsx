/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
import { FaRegStar, FaStar} from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { fetchChangeStateUserBooking, fetchCreateUserReview } from '../../redux/actions/action';


// eslint-disable-next-line react/prop-types
const ModalUserReview = ({show, handleClose, booking, refetchBookings}) => {

    //STATE:
    const [form, setForm] = useState({
        score: 0,
        description: "",
    })

    //DISPATCH:
    const dispatch = useDispatch()

    //FUNCTIONS:
    const handleStarClick = (index) => {
        setForm({
            ...form,
            score: index + 1
        })
    }

    const renderStars = () => {
        return [0, 1, 2, 3, 4].map((index) => {
            return (
                <span key={index} onClick={() => handleStarClick(index)} style={{ cursor: 'pointer' }}>
                  {form.score > index ? <FaStar className="text-primary display-4 me-1"/> : <FaRegStar className="text-primary display-4 me-1"/>}  
                </span>
            )
        })
    }

    const handleSave = async () => {
        try {
            // eslint-disable-next-line react/prop-types
            await dispatch(fetchCreateUserReview(booking.user.id, form)).then(() => {
                dispatch(fetchChangeStateUserBooking(booking.id))
            }).then(refetchBookings).catch((error) => {
                console.log(error)
            });
            handleClose();
        } catch (error) {
            console.error("Failed to save review: ", error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>

            <Modal.Header className="bg-tertiary mb-3 border border-primary">
                <Modal.Title className="text-dark display-6">Make review</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <InputGroup required className='d-flex justify-content-center '>
                    {renderStars()}
                </InputGroup>
                <InputGroup className='d-flex flex-column mt-4'>
                    <h6 className='text-dark fw-bold fs-5'>Description:</h6>
                    <Form.Control as="textarea" className='w-100' required value={form.description} onChange={(e) => setForm({
                        ...form,
                        description: e.target.value
                    })}/>
                </InputGroup> 
            </Modal.Body>

            <Modal.Footer>
                <Button className="text-primary border border-primary fs-5 fw-medium rounded-pill px-4 shadow-sm" variant="secondary"  onClick={handleClose}>
                    Close
                </Button>
                <Button className=" text-secondary border border-secondary fs-5 fw-medium rounded-pill px-4 shadow-sm" onClick={handleSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalUserReview