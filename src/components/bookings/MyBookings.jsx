import { useEffect, useState } from "react";
import { Col, Container, Row, Badge, Button } from "react-bootstrap"
import ListGroup from 'react-bootstrap/ListGroup';
import { FaStar } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchAcceptBooking, fetchChangeStateAdvertisingBooking, fetchCreateAdvertising, fetchGetLooBooking, fetchGetMyBookings, fetchGetMyLoo, fetchRejectBooking } from "../../redux/actions/action";
import ModalUserReview from "./ModalUserReview";
import { Link, useNavigate } from "react-router-dom";
import ModalLooReview from "../advertising/ModalLooReview";

const MyBookings = () => {

    //STATE:
    const [show, setShow] = useState(false)
    const [showModal, setShowModal] = useState(false)

    //SELECTOR:
    const myBookings = useSelector((state) => state.getMyBookings.myBookings)
    console.log(myBookings)
    const looBookings = useSelector((state) => state.getLooBooking.looBooking)
    const roles = useSelector((state) => {
        return state.getPersonalProfile.userLogged.roles || [];
    })

    //DISPATCH:
    const dispatch = useDispatch()

    //NAVIGATE:
    const navigate = useNavigate()

    //EFFECT:
    useEffect(() => {
        dispatch(fetchGetMyBookings())
        dispatch(fetchGetMyLoo())
        dispatch(fetchGetLooBooking())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch ])

    useEffect(() => {
        if (show === false && showModal === false) {
            dispatch(fetchGetMyBookings());
            dispatch(fetchGetLooBooking());
        }
    }, [show, showModal, dispatch]);

    const refetchBookings = () => {
        dispatch(fetchGetMyBookings());
        dispatch(fetchGetLooBooking());
    };

    //FUNCTIONS:
    const acceptBooking = (bookingId) => {
        dispatch(fetchAcceptBooking(bookingId)).then(refetchBookings).catch((error) => {
            console.error("Failed to accept booking: ", error)
        })
    }
    const rejectBooking = (bookingId) => {
        dispatch(fetchRejectBooking(bookingId)).then(refetchBookings).catch((error) => {
            console.error("Failed to reject booking: ", error)
        })
    }
    const handleCreateAdvertising = (looId, bookingId) => {
        dispatch(fetchCreateAdvertising(looId))
        dispatch(fetchChangeStateAdvertisingBooking(bookingId))
        navigate("/advertising")
    }


    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <Container style={{marginTop: "5em", marginBottom:"10em"}}>
            <Row className="mt-4 mb-3">
                <Col>
                <h1 className="display-1 fw-medium text-center text-md-end">Your Bookings</h1>
                </Col>
            </Row>
            <Row className="p-4 rounded bg-white shadow-lg gx-6 mt-5 mb-5">
                <Col className="bg-tertiary p-4 rounded shadow-sm">
                    <ListGroup>
                        {
                            myBookings.length === 0 ? (<ListGroup.Item className="text-center text-primary">No booking found</ListGroup.Item>) : (
                                myBookings.map((booking) => (
                                    <ListGroup.Item key={booking.id} className="d-flex justify-content-between ">
                                        <Container>
                                            <Row>
                                                <Col xs={12} md={9}>
                                                <div className="d-flex align-items-center">
                                                    <p>Booking for <span className="text-dark fw-medium">{booking.loo.name}</span>, in <span className="text-dark fw-medium">{booking.loo.address}</span></p>
                                                </div>
                                                </Col>
                                                <Col xs={12} md={3}>
                                                <span className="d-flex align-items-start justify-content-center ">
                                                    {
                                                        booking.bookingState === "IN_PROGRESS" && (
                                                            <>
                                                            <p className="m-0 fw-medium">STATE:</p>
                                                            <Badge bg="tertiary" className="text-primary ms-2">{booking.bookingState}</Badge>
                                                            </>
                                                        ) 
                                                    }
                                                    {
                                                        booking.bookingState === "REJECTED" && (
                                                            <>
                                                            <p className="m-0 fw-medium">STATE:</p>
                                                            <Badge bg="tertiary" className="text-primary ms-2">{booking.bookingState}</Badge>
                                                            </>
                                                        ) 
                                                    }
                                                    {
                                                        booking.bookingState === "ACCEPTED" && !booking.advertisingSeen && !booking.looReviewDone && <Button className=" text-secondary border border-secondary fw-medium rounded-pill px-4 shadow-sm" onClick={() => handleCreateAdvertising(booking.loo.id, booking.id)}>Watch an advertising</Button>
                                                    }
                                                    {
                                                        booking.bookingState === "ACCEPTED" && booking.advertisingSeen && !booking.looReviewDone && <Button className=" text-secondary border border-secondary fw-medium rounded-pill px-4 shadow-sm" onClick={handleShowModal}>Make a review</Button>
                                                    }
                                                    {
                                                        showModal && <ModalLooReview handleClose={handleCloseModal} show={showModal} looId={booking.loo.id} bookingId={booking.id}/>
                                                    }
                                                    {
                                                        booking.advertisingSeen && booking.looReviewDone && (
                                                            <>
                                                            <p className="m-0 fw-medium">STATE:</p>
                                                            <Badge bg="tertiary" className="text-primary ms-2">{booking.bookingState}</Badge>
                                                            </>)
                                                    }
                                                </span>
                                                </Col>
                                            </Row>
                                        </Container>

                                        
                                        
                                    </ListGroup.Item>
                                ))
                            )
                        }
                    </ListGroup>
                </Col>
            </Row>
            {
                roles.includes('HOST') && (
                    <>
                                    <Row className="mt-5">
                <Col>
                <h1 className="display-1 fw-medium text-center text-md-start">Bookings for your loos</h1>
                </Col>
            </Row>
            <Row className="p-4 rounded bg-white shadow-lg gx-6 mt-5">
                <Col className="bg-tertiary p-4 rounded shadow-sm">
                    <ListGroup>
                        {
                            looBookings.length === 0 ? (<ListGroup.Item className="text-center text-primary fw-medium">No booking found</ListGroup.Item>) : (
                                looBookings.map((booking) => (
                                    <ListGroup.Item key={booking.id} className="d-flex justify-content-between ">
                                        <Container>
                                            <Row className="d-flex align-items-center">
                                                <Col xs={12} md={9}>
                                                    <div className="d-flex align-items-center">
                                                    <p>Booking for <span className="text-dark fw-medium ms-1">{booking.loo.name}</span>, by <span className="text-dark fw-medium ms-1">{booking.user.name} {booking.user.surname}</span> (<Link to={"/users/" + booking.user.id + "/reviews"} className="border-bottom border-primary" style={{textDecoration: "none"}}><span className="text-dark">{Math.round(booking.user.rate * 10) / 10} <FaStar className="mb-1"/></span></Link>)</p>
                                                    </div>
                                                </Col>
                                                <Col xs={12} md={3}>
                                                <span className="d-flex align-items-start justify-content-center ">
                                                    {
                                                        booking.bookingState === "IN_PROGRESS" && (
                                                            <>
                                                            <Button className="rounded-circle me-2" variant="outline-primary" onClick={()=> acceptBooking(booking.id)}><FaCheck /></Button>
                                                            <Button className="rounded-circle" variant="outline-primary" onClick={() => rejectBooking(booking.id)}><IoMdClose /></Button>
                                                            </>
                                                        )
                                                    }
                                                    {
                                                        booking.bookingState === "REJECTED" &&  (
                                                        <>   
                                                        <p className="m-0 fw-medium">STATE:</p>
                                                        <Badge bg="tertiary" className="text-primary ms-2">{booking.bookingState}</Badge>
                                                        </> )
                                                    }
                                                    {
                                                        booking.bookingState === "ACCEPTED" && !booking.userReviewDone && <Button className=" text-secondary border border-secondary fw-medium rounded-pill px-4 shadow-sm" onClick={handleShow}>Make review</Button>
                                                    }
                                                    {
                                                        booking.userReviewDone && booking.bookingState === "ACCEPTED" && (
                                                            <>   
                                                            <p className="m-0 fw-medium">STATE:</p>
                                                            <Badge bg="tertiary" className="text-primary ms-2">{booking.bookingState}</Badge>
                                                            </> )
                                                    }
                                                    {
                                                        show && <ModalUserReview handleClose={handleClose} show={show} booking= {booking} refetchBookings={refetchBookings}/>
                                                    }
                                                </span>
                                                </Col>
                                            </Row>
                                        </Container>

                                        
                                    </ListGroup.Item>
                                ))
                            )
                        }
                    </ListGroup>
                </Col>
            </Row>
                    </>
                )
            }

        </Container>
    )
}

export default MyBookings