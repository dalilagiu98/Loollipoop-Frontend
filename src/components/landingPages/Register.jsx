import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import { Row, Col, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { fetchCreateUser } from '../../redux/actions/action';
import { Link, useNavigate } from "react-router-dom";

const Register = function () {

    //STATE:
    const [form, setForm] = useState({
        name: "",
        surname: "",
        email: "",
        password: ""
    });

    const [errorPassword, setErrorPassword] = useState("")

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

    //NAVIGATE:
    const navigate = useNavigate()

    //EFFECT:
    useEffect(() => {
        if(isLoaded && !isError) {
            navigate("/login")
        }
    }, [isLoaded, isError, navigate])


    //DISPATCH:
    const dispatch = useDispatch();

    //FUNCTIONS:
    const handlePasswordChange = (e) => {
        const password = e.target.value;
            setForm({
                ...form,
                password: password
            })
            if (password.length < 8) {
                setErrorPassword('Password must be at least 8 characters long');
            } else {
                setErrorPassword('');
            }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password.length < 8) {
            setErrorPassword('Password must be at least 8 characters long');
            return;
        }

        dispatch(
            fetchCreateUser(form)
        )
    }

    return (
        <>
        <Row>
            <Col>
                <Link to="/welcome" className='btn btn-primary rounded-circle'><i className="bi bi-chevron-left"></i></Link>
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
                        !isLoading && isError && <h6 className="text-secondary fw-medium">Problem with email, please choose another one. </h6>
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
                        onChange={handlePasswordChange}
                        />
                    </InputGroup>
                    {errorPassword &&  <Alert variant="secondary">{errorPassword}</Alert> }

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