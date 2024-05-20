import { useEffect, useState } from "react";
import { Col, Container, Row, Card, Badge } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { fetchGetLooByAddress } from "../../redux/actions/action";

const SearchByAddress = () => {

    //STATE:
    const [inputValue, setInputValue] = useState("")
    const [debouncedAddress, setDebouncedAddress] = useState('');
    //DISPATCH:
    const dispatch = useDispatch()

    //SELECTOR:
    const looFound = useSelector((state) => state.getLooByAddress.looFound)
    const isLoading = useSelector((state) => state.getLooByAddress.isLoading)
    const isLoaded = useSelector((state) => state.getLooByAddress.isLoaded)
    const idUser = useSelector((state) => state.getPersonalProfile.userLogged.id)

    //EFFECT:
    useEffect(() => {
        const handler = setTimeout(() => {
            if(inputValue && inputValue.trim()) {
                setDebouncedAddress(inputValue)
            }
        }, 1000)

        return () => {
            clearTimeout(handler)
        } 
    }, [inputValue])

    useEffect(() => {
        if(debouncedAddress) {
            dispatch(fetchGetLooByAddress(debouncedAddress))
        }
    }, [debouncedAddress, dispatch])

    //FUNCTIONS:
    const generateRatingIcons = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;

        const icons = [];
        for (let i = 0; i < fullStars; i++) {
            icons.push(<FaStar key={i} className="text-primary fs-5"/>)
        }
        if(halfStar) {
            icons.push(<FaStarHalfAlt key="half-star" className="text-primary fs-5"/>)
        }
        for (let i = 0; i < emptyStars; i++) {
            icons.push(<FaRegStar key={`empty-${i}`} className="text-primary fs-5"/>)
        }

        return icons
    } 

    return (
        <Container className="mt-5 mb-5 flex-grow-1">
            <Row>
                <Col className="mt-4 mb-5">
                    <h1 className="display-1 fw-medium text-center text-md-end">Search by address</h1>
                </Col>                
            </Row>
            <Row className="justify-content-center">
                <Col xs={8}>
                <InputGroup className="mb-3 z-0">
                    <Form.Control
                    placeholder="Insert an addres, a city name..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    />
                </InputGroup>
                </Col>
            </Row>
            <Row className="">
                {
                    isLoading &&  (
                    <div className="d-flex justify-content-center mb-2">
                    <Spinner animation="border" variant="primary"/>
                    </div>
                    )
                }
                {
                    looFound.length === 0 && isLoaded && inputValue !== "" &&
                    <Col xs={12} className="bg-white rounded shadow lg mt-5 d-flex justify-content-center p-5 mb-5">
                    <div className="p-5 bg-tertiary w-100 h-100 d-flex justify-content-center rounded shadow-sm border-primary" style={{borderStyle: "dashed"}}>
                        <h3 className="fs-2 fw-light text-dark">No such loo found</h3>
                    </div>
                    </Col>
                }
                {
                    isLoaded && looFound.length > 0 && inputValue !== "" && (
                        looFound.map((loo) => (
                            <Col key={loo.id} xs={6} md={4} className="mt-3 mb-5">

                            <Link to={"/loo/" + loo.id} style={{textDecoration: "none"}}>
                                <Card className="h-100 border-0 shadow">
                                    <Card.Img variant="top" src={loo.imageLoo} />

                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title className="text-dark fw-bold fs-4">{loo.name}</Card.Title>

                                        <Card.Text style={{fontSize: "0.8em"}} className="text-dark"><CiLocationOn />{loo.address}</Card.Text>

                                        <Card.Text>{generateRatingIcons(loo.rate)}</Card.Text>

                                        <Card.Text className="bg-tertiary rounded px-3 py-1 shadow-sm flex-grow-1 d-flex align-items-center justify-content-center" style={{fontSize: "0.8em"}}>{loo.description}</Card.Text>

                                        <div className="d-flex justify-content-between align-items-center">

                                        <Badge bg={loo.looState === "BUSY" ? ("tertiary text-primary") : ("dark")} className= {!(loo.owner.id === idUser) && "h-100"}>{loo.looState}</Badge>

                                        </div>
                                    </Card.Body>
                                </Card>
                            </Link>    
                            </Col>
                        ))
                    )
                }
                {
                  inputValue === "" && (
                    <Col xs={12} className="bg-white rounded shadow lg mt-5 d-flex justify-content-center p-5" style={{marginBottom: "9em"}}>
                    <div className="p-5 bg-tertiary w-100 h-100 d-flex justify-content-center rounded shadow-sm border-primary" style={{borderStyle: "dashed"}}>
                        <h3 className="fs-2 fw-light text-dark">Insert an address</h3>
                    </div>
                    </Col>
                  )  
                }
            </Row>
        </Container>       
    )
}

export default SearchByAddress