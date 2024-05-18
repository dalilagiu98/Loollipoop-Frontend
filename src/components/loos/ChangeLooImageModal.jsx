/* eslint-disable react/prop-types */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { fetchChangeLooImage } from '../../redux/actions/action';

const ChangeLooImageModal = ({ handleClose, show, params}) => {

    //STATE:
    const [file, setFile] = useState();

    //SELECTOR:
    const isLoading = useSelector((state) => {
        return state.getLooById.isLoadingImage
    })
    const isLoaded = useSelector((state) => {
        return state.getLooById.isLoadedImage
    })
    const isError = useSelector((state) => {
        return state.getLooById.isErrorImage
    })
    const errorMessage = useSelector((state) => {
        return state.getLooById.errorMessageImage
    })

    //DISPATCH:
    const dispatch = useDispatch()

    //FUNCTIONS:
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    const handleUpload = () => {
        dispatch(fetchChangeLooImage(params.looId, file))
    }


    return (
        <Modal show={show} onHide={handleClose} className="border border-primary">

        <Modal.Header className="bg-tertiary mb-3 border border-primary">
          <Modal.Title className="text-dark display-6">Modal heading</Modal.Title>
        </Modal.Header>

        <Modal.Body className="m-0 p-2 fs-6 text-primary fw-light mb-2">Choose an image from your device, then upload and save your modifies.</Modal.Body>
        <Modal.Body>
            <Container>
            <Row>
                <Col className="px-2">
                    <InputGroup className="mb-5 roundend-pill" >
                        <Form.Control
                        required
                        onChange={handleFileChange}
                        label="Choose file"
                        className="rounded-pill"
                        type="file"
                        />
                    </InputGroup> 
                </Col>
            </Row>
            </Container>
            <div className="d-flex justify-content-center mb-2">
                {
                    isLoading && <Spinner animation="border" variant="primary"/>
                }
                {
                    !isLoading && isLoaded && !isError && <h6 className="text-dark fw-medium">Uploaded!</h6>
                }
                {
                    !isLoading && isError && <h6 className="text-dark fw-medium">{errorMessage}</h6>
                }
            </div>   
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-evenly">
            <Button onClick={handleUpload} className=" text-secondary border border-secondary fs-5 fw-medium rounded-pill px-4 shadow-sm" >Upload</Button>

            <Button onClick={handleClose} className="text-primary border border-primary fs-5 fw-medium rounded-pill px-4 shadow-sm" variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default ChangeLooImageModal