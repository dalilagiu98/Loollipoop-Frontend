import { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { fetchCreateUser } from '../redux/actions/action';
import { Link } from "react-router-dom";

const Register = function () {

    //STATE:
    const [form, setForm] = useState({
        name: "",
        surname: "",
        email: "",
        password: ""
    });

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

                    <Button type='submit' className='rounded-pill w-100 border -success mt-5'>Registrati!</Button>
                </Form>
            </Col>
        </Row>
    </>
    )
}

export default Register