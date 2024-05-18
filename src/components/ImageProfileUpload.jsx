import { useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from "react-redux"
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { fetchPersonalProfile } from "../redux/actions/action";

// eslint-disable-next-line react/prop-types
const ImageProfileUpload = ({ handleClose }) => {

    //VARIABLES:
    let token = localStorage.getItem("accessToken")

    //STATE:
    const [file, setFile] = useState();
    const[isUploading, setIsUploading] = useState(false);
    const [isError, setIsError] = useState(false)
    const [isUploaded, setIsUploaded] = useState(false);

    //DISAPATCH:
    const dispatch = useDispatch()
    //FUNCTIONS:
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    const handleUpload = async () => {
        let formData = new FormData();
        formData.append("avatar", file);
        setIsUploading(true)
        try {
            let response = await fetch("http://localhost:3001/users/me/avatar", {
                method: "PATCH",
                body: formData,
                headers: {
                    Authorization: "Bearer " + token
                }
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
                throw new Error("Error in upload image")
            }

        
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
        <Container>
          <Row>
            <Col className="px-2">

                <InputGroup className="mb-5 roundend-pill" >
                    <Form.Control
                    onChange={handleFileChange}
                    label="Choose file"
                    className="rounded-pill"
                    type="file"
                    />
                </InputGroup> 
                <div className="d-flex justify-content-center mb-2">
                    {
                        isUploading && <Spinner animation="border" size="sm" variant="primary"/>
                    }
                    {
                        !isUploading && isUploaded && !isError && <h6 className="text-dark fw-medium">Uploaded!</h6>
                    }
                    {
                        !isUploading && isError && <h6 className="text-dark fw-medium">Error to upload file!</h6>
                    }
                </div>
                <Modal.Footer className="d-flex justify-content-evenly">
                        <Button onClick={handleUpload} className=" text-secondary border border-secondary fs-5 fw-medium rounded-pill px-4 shadow-sm" >Upload</Button>

                        <Button onClick={handleClose} className="text-primary border border-primary fs-5 fw-medium rounded-pill px-4 shadow-sm" variant="secondary">Close</Button>
                </Modal.Footer>

            </Col>
          </Row>
        </Container>
      </>
    )
}

export default ImageProfileUpload
