import { useState, useEffect } from 'react';
import { Row, Col, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { actionCreateUserSuccess, fetchCreateUser } from '../../redux/actions/action';
import { Link, useNavigate } from "react-router-dom";

const Register = function () {

    //STATE:
    const [form, setForm] = useState({
        name: "",
        surname: "",
        email: "",
        password: ""
    });

    //SELECTOR:
    const isLoading = useSelector((state) => {
        return state.createUser.isLoading
    })
    const isLoaded = useSelector((state) => {
        return state.createUser.isLoaded
    })
    const isError = useSelector((state) => {
        return state.createUser.isError
    })
    const errorMessage = useSelector((state) => {
        return state.createUser.errorMessage
    })

    //NAVIGATE:
    const navigate = useNavigate()

    //EFFECT:
    useEffect(() => {
        if(isLoaded && !isError) {
            navigate("/login")
            dispatch(actionCreateUserSuccess())
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded, isError, navigate])


    //DISPATCH:
    const dispatch = useDispatch();

    //FUNCTIONS:

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(
            fetchCreateUser(form)
        )
    }

    return (
        <>
        <Row>
            <Col>
                <Link to="/" className='btn btn-primary rounded-circle'><i className="bi bi-chevron-left"></i></Link>
            </Col>
        </Row>
        <Row className='justify-content-center'>
            <Col className='col-12 col-md-6'>
                <Form className='d-flex flex-column align-items-center' onSubmit={handleSubmit}>
                    <img src='logoname.png' alt='logo-name' style={{width: '15em'}} className='mb-4'/>
                    <h1 className='mb-5'>Registrazione</h1>

                    <InputGroup className="mb-3">
                        <Form.Control
                        type='text'
                        required
                        placeholder="Nome..."
                        aria-label="Nome..."
                        value={form.name}
                        onChange={(e) => setForm({
                            ...form,
                            name: e.target.value
                        })}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <Form.Control
                        type='text'
                        required
                        placeholder="Cognome..."
                        aria-label="Cognome..."
                        value={form.surname}
                        onChange={(e) => setForm({
                            ...form,
                            surname: e.target.value
                        })}
                        />
                    </InputGroup>
                    <div className="d-flex justify-content-center mb-2">
                    {
                        !isLoading && isError && <h6 className="text-secondary fw-medium">{errorMessage}</h6>
                    }
                    </div>
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

                    <div className="d-flex justify-content-center">
                    {
                        isLoading && <Spinner animation="border" variant="secondary"/>
                    }
                    {
                        !isLoading && isLoaded && !isError &&  <h6 className="text-dark fw-medium">Uploaded!</h6>
                    }

                    </div>
                    <Button type='submit' className='rounded-pill w-100 border -success mt-5'>Sign up!</Button>
                </Form>
            </Col>
        </Row>
    </>
    )
}

export default Register