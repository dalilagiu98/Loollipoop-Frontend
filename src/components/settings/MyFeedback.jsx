import { Col, Container, Form, Row } from "react-bootstrap"
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';
import { FaRegStar, FaStar} from "react-icons/fa";
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateFeedback } from "../../redux/actions/action";

const MyFeedback = () => {
        
    //STATE:
    const [form, setForm] = useState({    
        score: 0,
        title: "",
        description: "",
    })

    //DISPATCH:
    const dispatch = useDispatch();

    //SELECTOR:
    const isLoading = useSelector((state) => state.createFeedback.isLoading);
    const isLoaded = useSelector((state) => state.createFeedback.isLoaded);
    const isError = useSelector((state) => state.createFeedback.isError);

    //FUNCTIONS:
    const handleStarClick = (index) => {
        setForm({
            ...form,
            score: index + 1
        })
        console.log("rate: " + form.score)
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

    const handleSave =  () => {
        dispatch(fetchCreateFeedback(form))
    }


    return (
        <Container style={{marginTop: "5em", marginBottom: "3em"}}>
            <Row>
                <Col>
                    <h1 className="display-1 fw-medium text-center text-md-end">Leave us a feedback</h1>
                </Col>
            </Row>
            <Row className="mt-4">
                <Form className="d-flex flex-column align-items-center">
                <InputGroup required className='d-flex justify-content-center '>
                    {renderStars()}
                </InputGroup>
                <InputGroup className='d-flex flex-column mt-4'>
                    <h6 className='text-dark fw-bold fs-5'>Title:</h6>
                    <Form.Control className='w-100' required value={form.title} onChange={(e) => setForm({
                        ...form,
                        title: e.target.value
                    })}/>
                </InputGroup> 
                <InputGroup className='d-flex flex-column mt-4'>
                    <h6 className='text-dark fw-bold fs-5'>Description:</h6>
                    <Form.Control as="textarea" className='w-100' required value={form.description} onChange={(e) => setForm({
                        ...form,
                        description: e.target.value
                    })}/>
                </InputGroup>
                <div className="d-flex justify-content-center">
                    {
                        isLoading && <Spinner animation="border" variant="secondary"/>
                    }
                    {
                        !isLoading && isLoaded && !isError &&  <h6 className="text-dark fw-medium mt-5">Uploaded!</h6>
                    }
                </div>
                <Button className=" text-secondary border border-secondary fs-5 fw-medium rounded-pill px-4 shadow-sm mt-5" onClick={handleSave}>
                    Save
                </Button> 
                </Form>
            </Row>
        </Container>
    )
}

export default MyFeedback