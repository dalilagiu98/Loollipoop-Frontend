import { Row, Col, Button, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector,  } from "react-redux";
import { fetchLoginUser,  } from '../../redux/actions/action';
import { Link, useNavigate } from "react-router-dom";
import ModalChangePasswordEmail from './ModalChangePasswordEmail';

const Login = () => {

    //STATE:
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [show, setShow] = useState(false)

    //SELECTOR:
    const isLoading = useSelector((state) => {
        return state.loginUser.isLoading
    })
    const isLoaded = useSelector((state) => {
        return state.loginUser.isLoaded
    })
    const isError = useSelector((state) => {
        return state.loginUser.isError
    })
    const errorMessage = useSelector((state) => {
        return state.loginUser.errorMessage
    })

    //NAVIGATE:
    const navigate = useNavigate()

    //DISPATCH:
    const dispatch = useDispatch();

    //FUNCTIONS:
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(fetchLoginUser(form))
    }

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    //EFFECT:
    useEffect(() => {
        if(isLoaded && !isError) {
            navigate("/home")
        }
    }, [isLoaded, isError, navigate])


    return(
        <>
            <Row>
                <Col>
                    <Link to="/" className='btn btn-primary rounded-circle'><i className="bi bi-chevron-left"></i></Link>
                </Col>
            </Row>
            <Row className='justify-content-center'>
            <Col className='col-11 col-md-6'>
                <Form className='d-flex flex-column align-items-center' onSubmit={handleSubmit}>
                    <img src='logoname.png' alt='logo-name' style={{width: '15em'}} className='mb-4'/>
                    <h1 className='mb-5'>Login</h1>

                    <InputGroup className="mb-3">
                        <Form.Control
                        type='email'
                        required
                        placeholder="Email..."
                        aria-label="Email..."
                        value={form.email}
                        onChange={(e) => setForm({
                            ...form,
                            email: e.target.value
                        })}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <Form.Control
                        type='password'
                        required
                        placeholder="Password..."
                        aria-label="Password..."
                        value={form.password}
                        onChange={(e) => setForm({
                            ...form,
                            password: e.target.value
                        })}
                        />
                    </InputGroup>
                
                    <Button onClick={handleShow} ><u>Have you forgot your password?</u></Button>
                 
                    {
                        show && <ModalChangePasswordEmail handleClose={handleClose} show={show}/>
                    }
                    
                    <div className="d-flex justify-content-center">
                    {
                        isLoading && <Spinner animation="border" variant="secondary"/>
                    }
                    {
                        !isLoading && isLoaded && !isError &&  <h6 className="text-dark fw-medium">Uploaded!</h6>
                    }
                    {
                        !isLoading && isError && <h6 className="text-secondary fw-medium">{errorMessage}</h6>
                    }
                    </div>    
                    <Button type='submit' className='rounded-pill w-100 border-success mt-3'>Sign in!</Button>
                </Form>
            </Col>
        </Row>
    </>        
    )
}

export default Login