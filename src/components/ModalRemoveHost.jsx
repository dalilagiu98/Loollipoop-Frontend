import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { useState } from 'react';
import { useDispatch } from "react-redux"
import { fetchPersonalProfile } from "../redux/actions/action";


// eslint-disable-next-line react/prop-types
const ModalRemoveHost = ({handleClose, show}) => {

    //STATE:
    const [isUploading, setIsUploading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const [isError, setIsError] = useState(false);

    //VARIABLES:
    const token = localStorage.getItem("accessToken")

    //DISPATCH:
    const dispatch = useDispatch()

    //FUNCTIONS:
    const handleChange = async () => {
        setIsUploading(true)
        try {
            let response = await fetch("http://localhost:3001/users/me/roles",
        {
            method: "PATCH",
            headers: {
                Authorization: "Bearer " + token
            }
        })

        if(response.ok) {
            let data = await response.json();
            console.log(data)
            setIsUploading(false)
            setIsUploaded(true)
            dispatch(fetchPersonalProfile())
        } else {
            setIsUploading(false)
            setIsError(true);
            throw new Error("Error in change role")
        }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Modal show={show} onHide={handleClose} className="border border-primary">
            <Modal.Header className="bg-tertiary mb-3 border border-primary">
                <Modal.Title className="text-dark display-6">Remove Host role</Modal.Title>
            </Modal.Header>

            <Modal.Body className='text-dark fw-mediums'>By clicking &apos;Dismiss&apos;, you will remove your host role and all your created cabinets will be lost. Do you want to proceed?</Modal.Body>

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
            <Button className="text-primary border border-primary fs-5 fw-medium rounded-pill px-4 shadow-sm " variant="secondary" onClick={handleClose}>
                Not now
            </Button>
            <Button className=" text-secondary border border-secondary fs-5 fw-medium rounded-pill px-4 shadow-sm" onClick={() => {
                handleChange();
                handleClose();
            }}>
                Dismiss
            </Button>
            </Modal.Footer>
        </Modal>   
    )
}

export default ModalRemoveHost