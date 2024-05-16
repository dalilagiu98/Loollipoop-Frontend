import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Col, Row, Container, Button } from "react-bootstrap"
import Card from 'react-bootstrap/Card';
import { FaPlus } from "react-icons/fa";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import AddingLooModal from "./AddingLooModal";
import { fetchGetMyLoo, resetLoadedLooCreated } from "../../redux/actions/action";
import Badge from 'react-bootstrap/Badge';

const MyLoo = () => {

    //STATE:
    const [show, setShow] = useState(false)

    //SELECTOR:
    const myLoos = useSelector((state) => {
        return state.getPersonalLoo.myLoos
    })

    console.log(myLoos)

    //DISPATCH
    const dispatch = useDispatch()

    //FUNCTIONS:
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        dispatch(resetLoadedLooCreated())
    }

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

    //EFFECT:
    useEffect(() => {
        dispatch(fetchGetMyLoo())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            <Row>
                <Col>
                    <h1 className="display-1 fw-medium text-center text-md-start">Your Loos</h1>
                </Col>
            </Row>
            <Row className="bg-white rounded shadow-lg p-4">
                <Col xs={12} className="bg-tertiary rounded shadow-sm p-2">
                    <Container>
                        {
                            myLoos.length > 0 ? (
                                <Row className="gy-3">
                                {myLoos.map((loo) => (
                                    <Col xs={12} md={4} key={loo.id} >
                                        <Card className="h-100 border-0 shadow">
                                        <Card.Img variant="top" src={loo.imageLoo} />
                                        <Card.Body className="d-flex flex-column">
                                        <Card.Title className="text-dark fw-bold fs-5">{loo.name}</Card.Title>
                                        <Card.Text style={{fontSize: "0.9em"}} className="text-dark"><CiLocationOn />{loo.address}</Card.Text>
                                        <Card.Text className="bg-tertiary rounded px-3 py-2 shadow-sm flex-grow-1 d-flex align-items-center justify-content-center ">{loo.description}</Card.Text>
                                        <div className="d-flex justify-content-between ">
                                            <Badge bg={loo.looState === "BUSY" ? ("primary") : ("dark")}>{loo.looState}</Badge>
                                            <Card.Text>{generateRatingIcons(loo.rate)}</Card.Text>
                                        </div>
                                        </Card.Body>
                                    </Card>
                                    </Col>   
                                ))}
                                    <Col xs={12} md={4} className="d-flex align-items-center justify-content-center ">
                                        <Button variant="outline-primary" className="hovered-button" style={{borderStyle: "dashed"}}><FaPlus style={{fontSize: "10em"}} onClick={handleShow}/></Button>
                                        {
                                            show && <AddingLooModal show={show} handleClose={handleClose}/>
                                        }
                                    </Col>
                                
                                </Row>
                            ) : (
                            <Row className="gx-0">  
                                <Col xs={6} md={4} className="d-flex align-items-center justify-content-center me-0">
                                    <Button variant="outline-primary" className="hovered-button p-5 h-100 w-100 text-dark" style={{borderStyle: "dashed"}} disabled ><u>No loos found</u></Button>
                                </Col>
                                <Col xs={6} md={4} className="d-flex align-items-center justify-content-center">
                                    <Button variant="outline-primary" className="hovered-button" style={{borderStyle: "dashed"}}><FaPlus style={{fontSize: "10em"}} onClick={handleShow}/></Button>
                                    {
                                        show && <AddingLooModal show={show} handleClose={handleClose}/>
                                    }
                                </Col>
                            </Row>          
                        )
                        }
                    </Container>
                </Col>
            </Row>
        </>    
    )
}

export default MyLoo