import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap"
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import Card from 'react-bootstrap/Card';
import { fetchGetReviewByUserId } from "../../redux/actions/action";

const UserReview = () => {

    //SELECTOR:
    const reviewUser = useSelector((state) => state.getReviewById.reviewsByUserId)

    //PARAMS:
    const params = useParams();

    //DISPATCH:
    const dispatch = useDispatch();
    
    //EFFECT:
    useEffect(() => {
        dispatch(fetchGetReviewByUserId(params.userId))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

      //FUNCTIONS:
      const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('it-IT', options);
    };

    const generateRatingIcons = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;

        const icons = [];
        for (let i = 0; i < fullStars; i++) {
            icons.push(<FaStar key={i} className="text-primary fs-1"/>)
        }
        if(halfStar) {
            icons.push(<FaStarHalfAlt key="half-star" className="text-primary fs-1"/>)
        }
        for (let i = 0; i < emptyStars; i++) {
            icons.push(<FaRegStar key={`empty-${i}`} className="text-primary fs-1"/>)
        }

        return icons
    }


    return (
        <Container style={{marginTop: "6em", marginBottom: "6em"}}>
        <Row>
            <Col>
                <h1 className="display-1 fw-medium text-center text-md-start">Review for user</h1>
            </Col>
        </Row>
        <Row className="bg-white rounded shadow-lg p-3 mt-3">
            {
                reviewUser.length === 0 ? (
                    <Col className="d-flex justify-content-center p-5">
                        <div>
                            <h2 className="display-3 text-dark">No such reviews found</h2>
                        </div>
                    </Col>
                ) : (
                    reviewUser.map((review) => (
                        <Col key={review.id} xs={12} className="bg-tertiary rounded p-2">
                            <Card>
                                <Card.Body>
                                    <div className="d-flex align-items-center justify-content-between border-bottom pb-2">
                                        <div className="d-flex align-items-center ">
                                            <img src={review.userWhoMadeReview.avatarUrl} alt="avatar-user" style={{height: "4em"}} className="rounded-circle"/>
                                            <div className="d-flex flex-column ms-3">
                                            <Card.Title className="text-dark">{review.userWhoMadeReview.name} {review.userWhoMadeReview.surname}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{formatDate(review.dateReview)}</Card.Subtitle>
                                        </div>
                                        </div>

                                        <div>
                                            {generateRatingIcons(review.score)}
                                        </div>
                                        
                                    </div>

                                    <Card.Text className="fs-2 p-3">
                                        {review.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )
            }

        </Row>
    </Container>
    )
}

export default UserReview