import { Row, Col, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
import { useDispatch,  } from "react-redux";
import { fetchLoginUser,  } from '../../redux/actions/action';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    //STATE:
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    //NAVIGATE:
    const navigate = useNavigate()

    //DISPATCH:
    const dispatch = useDispatch();

    //FUNCTIONS:
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(fetchLoginUser(form))
        navigate("/")
    }
    return(
        <>
            <Row>
                <Col>
                    <Link to="/welcome" className='btn btn-primary rounded-circle'><i className="bi bi-chevron-left"></i></Link>
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

                    <Button type='submit' className='rounded-pill w-100 border -success mt-5'>Entra!</Button>
                </Form>
            </Col>
        </Row>
    </>        
    )
}

export default Login