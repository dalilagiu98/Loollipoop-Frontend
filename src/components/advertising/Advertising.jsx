import { useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { fetchUpdateCashGuest, fetchUpdateCashHost } from "../../redux/actions/action"
import { useNavigate } from "react-router-dom"
// import ModalLooReview from "./ModalLooReview"



const Advertising = () => {

    //STATE:
    const [showButton, setShowButton] = useState(false)
    // const [showModal, setShowModal] = useState(false);

    //SELECTOR:
    const advertisingGenereted = useSelector((state) => state.createAdvertising.advertisingGenereted)
    console.log(advertisingGenereted)

    //DISPATCH:
    const dispatch = useDispatch()

    //NAVIGATE:
    const navigate = useNavigate()


    //FUNCTIONS:
    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
          setShowButton(true);
        }
      
        return (
          <div className="timer">
            <div className="value display-1 fw-medium text-dark  ">{remainingTime}</div>
          </div>
        );
      };

    // const handleClose = () => setShowModal(false);

    const handleClick = () => {
        dispatch(fetchUpdateCashHost(advertisingGenereted.loo.owner.id, advertisingGenereted.amount))
        dispatch(fetchUpdateCashGuest(advertisingGenereted.amount))
        navigate("/bookings")
        // setShowModal(true)
    }

    return (
        <Container style={{marginTop: "8em", marginBottom: "5em"}} className="ms-3 me-3">
            <Row className="d-flex align-items-center">

                <Col  xs={12} md={4} className="d-flex justify-content-center mb-5 mb-md-0">
                    <div >
                    {
                        !showButton && (
                            <CountdownCircleTimer
                            isPlaying
                            duration={advertisingGenereted.duration}
                            colors={["#FFFFE9", "#fbc2c8", "#fd8c9b", "#FD6B7D"]}
                            colorsTime={[advertisingGenereted.duration, advertisingGenereted.duration / 2, advertisingGenereted.duration / 4, 0]}
                            onComplete={() => ({ shouldRepeat: false, delay: 1 })}
                            >
                            {renderTime}
                        </CountdownCircleTimer>
                        )
                    }
                    {
                        showButton && <Button className=" text-secondary border border-secondary fs-5 fw-medium rounded-pill px-4 shadow-sm" onClick={handleClick}>Make a review</Button>
                    }
                    {/* {
                        showModal && <ModalLooReview handleClose={handleClose} show={showModal} looId={advertisingGenereted.loo.id}/>
                    } */}
                    </div>
                </Col>

                <Col xs={12} md={8} className="bg-white rounded shadow-lg p-4">
                    <div className="d-flex justify-content-center bg-tertiary rounded shadow-sm p-3">
                    {advertisingGenereted &&  <img src={advertisingGenereted.url} alt="advertising" className="img-fluid"/>}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Advertising