import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap"
import Badge from 'react-bootstrap/Badge';
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux"
import { fetchPersonalProfile } from "../redux/actions/action";
import ImageProfileUpload from "./ImageProfileUpload";
import ModalModifyProfile from "./ModalModifyProfile";


const Profile = () => {

    //STATE:
    const [isHovered, setIsHovered] = useState(false);
    const [show, setShow] = useState(false);
    const [isHoveredBig, setIsHoveredBig] = useState(false)
    const [showBig, setShowBig] = useState(false)

    //SELECTOR:
    const userLogged = useSelector((state) => {
        return state.getPersonalProfile.userLogged
    })
    const roles = useSelector((state) => {
        return state.getPersonalProfile.userLogged.roles
    })
    const rate = useSelector((state) => {
        return state.getPersonalProfile.userLogged.rate
    })

    //DISPATCH:
    const dispatch = useDispatch();

    //EFFECT:
    useEffect(()=>{
        dispatch(fetchPersonalProfile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //FUNCTIONS:
    //generate rate icons:
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

    //show/close modal image:
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false)

    //show modal modifies:
    const handleShowBig = () => setShowBig(true)
    const handleCloseBig = () => setShowBig(false)
    
    return (
        <Container className="h-100 mb-5" style={{marginTop: "4em"}}>
            <Row className="mt-4 mb-3">
                <Col>
                    <h1 className="display-1 fw-medium text-center text-md-end">Account</h1>
                </Col>
            </Row>
            <Row className="p-4 rounded bg-white shadow-lg gx-6">
                <Col className="col-12 col-md-4 ">
                    <div className="d-flex flex-column bg-tertiary rounded p-3 shadow-sm mb-4 h-100">

                        <div  onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}className="d-flex justify-content-center position-relative">
                            <img src={userLogged.avatarUrl} alt="avatar-image" style={{width: "200px", height: "200px", objectFit: "cover"}} className="rounded-circle shadow"/>

                            {isHovered && 
                                <i
                                onClick={handleShow}
                                className="bi bi-pencil-fill text-secondary fs-3 btn rounded-circle "
                                style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                }}
                                ></i>
                            }
                            {
                                show && (
                                <Modal show={show} onHide={handleClose} animation={false} className="border border-primary">
                                    <Modal.Header className="bg-tertiary mb-3 border border-primary" closeButton>
                                      <Modal.Title className="text-dark display-6">Upload image profile</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <p className="m-0 p-2 fs-6 text-primary fw-light mb-2">Choose an image from your device, then upload and save your modifies.</p>
                                        <ImageProfileUpload handleClose={handleClose}/>
                                    </Modal.Body>

                                </Modal>   
                                )
                            }

                        </div>


                        <div className="flex-grow-1">
                            <div className="d-flex border-bottom pb-2 border-primary mt-4 justify-content-between ">
                                <div className="d-flex">
                                    <img src='logo.png' alt='logo' style={{height: '1.8em'}}/>                     
                                    <h4 className="text-dark fw-bolder m-0">Rate:</h4>
                                </div>
                                <h4 className="m-0 me-3 fw-medium">{rate}<span className="fs-6 fw-light text-dark ms-1">pt.</span></h4>
                            </div>
                            <div className="d-flex justify-content-center mt-4">
                                
                                {generateRatingIcons(rate)}
                            </div>
                        </div>

                        <div>
                            <div className="d-flex border-bottom pb-2 border-primary mt-4">
                                <img src='logo.png' alt='logo' style={{height: '1.8em'}}/>                     
                                <h4 className="text-dark fw-bolder m-0">Roles:</h4>
                            </div>
                            <h2  className="mt-2">
                            {
                                roles.map((role) => (                          
                                    <Badge bg="primary" key={userLogged.id + role} className="me-2">{role}</Badge>                               
                                ))                        
                            }
                            </h2>
                        </div>

                    </div>
                    
                </Col>
                <Col>
                    <div onMouseEnter={() => setIsHoveredBig(true)} onMouseLeave={() => setIsHoveredBig(false)} className="p-3 bg-tertiary rounded shadow-sm">

                        <div className="d-flex border-bottom pb-2 border-primary mb-4 position-relative">
                            <img src='logo.png' alt='logo' style={{height: '2em'}}/>                     
                            <h2 className="text-dark fw-bolder ">Personal informations:</h2>
                            {
                                isHoveredBig && <i onClick={handleShowBig} className="bi bi-pencil-fill fs-4 btn rounded-circle position-absolute btn-outline-dark border-0" style={{top: "-0.3em", right: "0"}}></i>
                            }
                            {
                                showBig && <ModalModifyProfile  show={showBig} handleClose={handleCloseBig}/>
                            }
                        </div>

                        <h5 className="text-dark fw-medium">Name:</h5>
                        <h6>{userLogged.name}</h6>
                        <h5 className="text-dark fw-medium">Surname:</h5>
                        <h6>{userLogged.surname}</h6>
                        <h5 className="text-dark fw-medium">Email:</h5>
                        <h6>{userLogged.email}</h6>

                        <div className="d-flex border-bottom pb-2 border-primary mt-5">
                            <img src='logo.png' alt='logo' style={{height: '2em'}}/>                     
                            <h2 className="text-dark fw-bolder ">Wallet:</h2>
                        </div>

                        <div>
                            <h6 className="fw-light text-dark mt-3">You have earned:</h6>
                            <p className="display-2 text-end">{userLogged.cashBalance}<span className="display-3 text-dark ms-3">€</span></p>
                            
                        </div>

                    </div>
                </Col>
                <Container>
                    <Row className="mt-4 text-center text-md-end">
                        <Col xs={12}>
                        
                            <Button variant="dark" className="text-secondary fs-5 fw-medium rounded-pill px-4 shadow-sm "> { !roles.includes('HOST') ? ("Upgrade to Host") : ("Downgrade")}</Button>
                        
                        </Col>
                    </Row>
                </Container>
            

            </Row>
        </Container>
    )
}

export default Profile