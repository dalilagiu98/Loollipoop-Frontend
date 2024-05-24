import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from "react-redux";
import { fetchGetFeedback } from "../../redux/actions/action";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Home = () => {

    //SELECTOR:
    const feedback = useSelector((state) => state.getFeedback.feedback)

    //DISPATCH:
    const dispatch = useDispatch()

    //EFFECT:
    useEffect(() => {
        dispatch(fetchGetFeedback())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const generateRatingIcons = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;

        const icons = [];
        for (let i = 0; i < fullStars; i++) {
            icons.push(<FaStar key={i} className="text-primary fs-4"/>)
        }
        if(halfStar) {
            icons.push(<FaStarHalfAlt key="half-star" className="text-primary fs-4"/>)
        }
        for (let i = 0; i < emptyStars; i++) {
            icons.push(<FaRegStar key={`empty-${i}`} className="text-primary fs-4"/>)
        }

        return icons
    }


    return (
        <>
            <Container style={{marginTop: "6em"}}>
                <Row className="justify-content-center z-2 gx-4">
                <Col xs={12} md={6} className="mt-3 d-flex justify-content-center flex-column align-items-center">
                        <div className="ms-2 text-center">
                            <h2 className="fs-1 fw-semibold">Share & Use Private Loo</h2>
                            <h4 className="p-0 m-0 fs-6 fw-normal ">Need a clean, private bathroom on the go? Or have a bathroom you&apos;d like to share and earn credits? Start now!</h4>
                            <div className="d-flex mt-3  flex-column flex-md-row justify-content-around">
                            <Button className=" text-secondary border border-secondary fs-6 fs-md-5 fw-medium rounded-pill px-4 shadow-sm mb-3 mb-md-0">Share your Loo</Button>
                            <Button  className="text-primary border border-primary fs-6 fs-md-5 fw-medium rounded-pill px-4 shadow-sm mb-4 mb-md-0" variant="secondary">Search by Position</Button>
                            </div>
                        </div>

                    </Col>
                    <Col xs={12} md={6} className="d-flex justify-content-center ">
                        <img src="/logoname.png" alt="logoname"  className="img-fluid" style={{height: "15em"}}/>

                    </Col>
                </Row>
            </Container>
            <Container fluid className="py-4 bg-primary mt-5 border-bottom border-top border-white shadow" >
                <Row className="d-flex justify-content-center">
                    <Col xs={12}>
                        <div className="d-flex justify-content-center">
                            <h2 className="fw-semibold text-white">How Does Loollipoop work?</h2>
                        </div>
                    </Col>
                    <Col xs={10} md={3} className="mt-3">
                        <Card className="text-center h-100 shadow-sm position-relative">
                            <Button className="rounded-circle position-absolute text-white" style={{top: "3px", right: "3px"}}> 1</Button>
                            <Card.Img variant="top" src="/1.png"/>
                            <Card.Body>
                                <Card.Title>You Upgrade</Card.Title>
                                <Card.Text className="fw-light" style={{fontSize: "0.9em"}}>
                                    Upgrade to Host for share your loo.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={10} md={3} className="mt-3">
                        <Card className="text-center h-100 shadow-sm position-relative">
                        <Button className="rounded-circle position-absolute text-white" style={{top: "3px", right: "3px"}}>2</Button>
                            <Card.Img variant="top" src="/2.png" />
                            <Card.Body>
                                <Card.Title>Register your Loo</Card.Title>
                                <Card.Text className="fw-light"  style={{fontSize: "0.9em"}}>
                                        Register the details of your loo.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={10} md={3} className="mt-3">
                        <Card className="text-center h-100 shadow-sm position-relative">
                            <Button className="rounded-circle position-absolute text-white" style={{top: "3px", right: "3px"}}>3</Button>
                            <Card.Img variant="top" src="/3.png"/>
                            <Card.Body>
                            <Card.Title>Earn & Enjoy</Card.Title>
                            <Card.Text className="fw-light"  style={{fontSize: "0.9em"}}>
                                Earn by advertising genereted by your loo rate.
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Container>
            <Container className="mt-4">
                <Row className="d-flex justify-content-center gy-3 gx-4">
                    <Col xs={12} className="mt-4">
                        <div className="d-flex justify-content-center">
                            <h2 className="fw-semibold">Testimonials</h2>
                        </div>
                    </Col>
                    {
                        feedback.map((feedback) => (
                            <Col key={feedback.id} xs={10} md={3} className=" rounded p-2">
                            <Card className="h-100 shadow">
                                <Card.Body>
                                    <div className="d-flex flex-column justify-content-between border-bottom pb-2">
                                        <div className="d-flex align-items-center ">
                                            <img src={feedback.user.avatarUrl} alt="avatar-user" style={{height: "4em"}} className="rounded-circle"/>
                                            <div className="d-flex flex-column ms-3">
                                            <Card.Title className="text-dark">{feedback.user.name} {feedback.user.surname}</Card.Title>
                                            </div>
                                        </div>

                                        <div className="text-end">
                                            {generateRatingIcons(feedback.score)}
                                        </div>
                                        
                                    </div>
                                    <Card.Text className="fs-4 mt-3">
                                        <em>&quot;{feedback.title}&quot;</em>
                                    </Card.Text>
                                    <Card.Text className="fs-5">
                                        {feedback.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        ))
                    }

                </Row>
            </Container>
        </>
    )
}

export default Home