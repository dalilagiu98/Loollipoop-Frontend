import { useEffect } from "react"
import { Container, Row, Col, Card, Badge } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchLooById } from "../../redux/actions/action"
import { CiLocationOn } from "react-icons/ci";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const LooDetail = () => {

        //SELECTOR:
    const looFound = useSelector((state) => {
        return state.getLooById.looFound
    })

    //DISPATCH:
    const dispatch = useDispatch()

    //PARAMS:
    const params = useParams()

    //EFFECT:
    useEffect(() => {
        dispatch(fetchLooById(params.looId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //FUNCTIONS:
    const generateRatingIcons = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;

        const icons = [];
        for (let i = 0; i < fullStars; i++) {
            icons.push(<FaStar key={i} className="text-primary fs-3"/>)
        }
        if(halfStar) {
            icons.push(<FaStarHalfAlt key="half-star" className="text-primary fs-3"/>)
        }
        for (let i = 0; i < emptyStars; i++) {
            icons.push(<FaRegStar key={`empty-${i}`} className="text-primary fs-3"/>)
        }

        return icons
    }



    return (
        <Container className="" style={{marginTop: "6em"}}>
            <Row className="bg-white rounded shadow-lg">
                <Col xs={12} md={6} className="d-flex justify-content-center ">
                <div className="p-3 bg-tertiary rounded my-4 shadow-sm" >
                    <img src={looFound.imageLoo} alt="loo-image" style={{maxWidth: "30em"}} className="rounded shadow "/> 
                </div>
                </Col>

                <Col xs={12} md ={6}>
                    <div className="mt-5 text-end me-2 mb-3"> 
                        <h1 className="text-dark fw-medium">{looFound.name}</h1>
                        <h5 className="fw-light text-dark"><CiLocationOn className="fs-4"/>{looFound.address}</h5>

                        <div className="d-flex justify-content-start mt-3">
                            {generateRatingIcons(looFound.rate)}
                        </div>

                        <Card.Body className="bg-tertiary rounded shadow-sm p-2 text-center mt-4 fw-med" style={{lineHeight: "1.8em"}}>{looFound.description}</Card.Body>


                        <div className="d-flex justify-content-start mt-5">
                        <Badge bg={looFound.looState === "BUSY" ? ("primary") : ("dark")}><h5 className="m-0 p-0">{looFound.looState}</h5></Badge>
                        </div>
                    </div>   
                </Col>
            </Row>
        </Container>
    )
}

export default LooDetail