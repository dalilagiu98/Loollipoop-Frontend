import { useEffect, useState } from "react"
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchChangeLooState, fetchLooById } from "../../redux/actions/action"
import { CiLocationOn } from "react-icons/ci";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import ChangeLooImageModal from "./ChangeLooImageModal"
import ChangeLooDetailModal from "./ChangeLooDetailModal"

const LooDetail = () => {

    //STATE:
    const [isHovered, setIsHovered ] = useState(false);
    const [isHoveredDetails, setIsHoveredDetails] = useState(false);
    //modals:
    const [showImage, setShowImage] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    //SELECTOR:
    const looFound = useSelector((state) => {
        return state.getLooById.looFound
    })
    console.log(looFound)
    const idUser = useSelector((state) => state.getPersonalProfile.userLogged.id)
    console.log(idUser)

    //DISPATCH:
    const dispatch = useDispatch()

    //PARAMS:
    const params = useParams()

    // MODALS FUNCTIONS:
    const handleShowImage = () => setShowImage(true);
    const handleCloseImage = () => setShowImage(false);

    const handleShowDetails = () => setShowDetails(true);
    const handleCloseDetails = () => setShowDetails(false);
    //EFFECT:
    useEffect(() => {
        dispatch(fetchLooById(params.looId))
        console.log(params.looId)
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

    const handleChangeState = () => {
        dispatch(fetchChangeLooState(params.looId))
    }

    //VARIABLES:
    const isOwner = looFound.owner && looFound.owner.id === idUser;

    if (!looFound) {
        return <div>Loading...</div>; // o qualsiasi altro indicatore di caricamento
    }

    return (
        <Container className="h-100" style={{marginTop: "6em"}}>
            <Row className="bg-white rounded shadow-lg h-100">
                <Col xs={12} lg={6} className="d-flex justify-content-center ">
                <div className="p-3 bg-tertiary rounded my-4 shadow-sm " onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    <div className="position-relative">
                        <img src={looFound.imageLoo} alt="loo-image" style={{maxWidth: "30em"}} className="rounded shadow "/> 
                        {isHovered &&  isOwner  &&  
                        (<div className="w-100 h-100 rounded" style={{
                            backgroundColor: "rgba(0, 0, 0, 0.2)",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)"
                            }}>
                            <i
                                onClick={handleShowImage}
                                className="bi bi-pencil-fill text-secondary fs-3 btn rounded-circle" style={{                            position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",}}
                            ></i>
                        </div>
                        )}
                        {
                            showImage && <ChangeLooImageModal handleClose={handleCloseImage} show={showImage} params={params}/>
                        }
                    </div>
                </div>
                </Col>

                <Col xs={12} lg ={6}>
                    <div className="mt-5 text-end me-2 mb-3 position-relative d-flex flex-column h-75" onMouseEnter={() => setIsHoveredDetails(true)} onMouseLeave={() => setIsHoveredDetails(false)}> 
                        {
                            isHoveredDetails &&  isOwner &&  <i onClick={handleShowDetails} className="bi bi-pencil-fill fs-4 btn rounded-circle position-absolute btn-outline-dark border-0 hovered-button" style={{top: "0", left: "0"}}></i>
                        }
                        {
                            showDetails && <ChangeLooDetailModal handleCloseDetail={handleCloseDetails} show={showDetails} />
                        }
                        <h1 className="text-dark fw-medium">{looFound.name}</h1>
                        <h5 className="fw-light text-dark"><CiLocationOn className="fs-4"/>{looFound.address}</h5>

                        <div className="d-flex justify-content-start mt-3">
                            {generateRatingIcons(looFound.rate)}
                        </div>

                        <Card.Body className="bg-tertiary rounded shadow-sm p-2 text-center mt-4 d-flex align-items-center " style={{lineHeight: "1.8em"}}>{looFound.description}</Card.Body>


                        <div className="d-flex justify-content-between mt-5">
                            <Badge bg={looFound.looState === "BUSY" ? ("tertiary text-primary") : ("dark")}><h5 className="m-0 p-0">{looFound.looState}</h5></Badge>
                            {
                                isOwner &&                             <Button className="text-secondary fs-5 fw-medium rounded-pill px-4 shadow-sm " onClick={handleChangeState}>Change state</Button>
                            }
                            {
                                !isOwner &&                             <Button className="text-secondary fs-5 fw-medium rounded-pill px-4 shadow-sm">Book</Button>
                            }
                        </div>
                    </div>   
                </Col>
            </Row>
        </Container>
    )
}

export default LooDetail