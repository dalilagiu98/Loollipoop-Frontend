/* eslint-disable react/prop-types */
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchCreateBooking, fetchGetMyBookings } from '../../redux/actions/action';

const DetailLooSelected = ({looSelected}) => {

    //SELECTOR:
    const idUser = useSelector((state) => state.getPersonalProfile.userLogged.id)
    console.log(idUser)
    const myBookings = useSelector((state) => state.getMyBookings.myBookings)
    console.log(myBookings)

    //DISPATCH:
    const dispatch= useDispatch()

    //STATE:
    const [hasActiveBookings, setHasActiveBookings] = useState(false);


    //EFFECT:
    useEffect(() => {
        dispatch(fetchGetMyBookings())
    }, [dispatch])

    useEffect(() => {
        if (looSelected) {
            setHasActiveBookings(myBookings.some((booking) => booking.loo.id === looSelected.id && booking.bookingState === "IN_PROGRESS"));
        }
    }, [myBookings, looSelected]);

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

    const handleClick = (looId) => {
        dispatch(fetchCreateBooking(looId))
            .then(() => {
                dispatch(fetchGetMyBookings());
            })
            .catch((error) => {
                console.error("Failed to create booking:", error);
            });
        }


    return (
        <Card className="h-100 border-0 shadow">
            {looSelected ? (
            <>
                    <Card.Img variant="top" src={looSelected.imageLoo}/>
                    <Card.Body className="d-flex flex-column">
                    <div className='d-flex justify-content-between '>
                        <Card.Title className="text-dark fw-bold fs-6">{looSelected.name}</Card.Title>
                        <Card.Text>{generateRatingIcons(looSelected.rate)}</Card.Text>
                    </div>
                    <Card.Text style={{fontSize: "0.8em"}} className="text-dark"><CiLocationOn />{looSelected.address}</Card.Text>
                    <Card.Text className="bg-tertiary rounded px-3 py-1 shadow-sm flex-grow-1 d-flex align-items-center justify-content-center" style={{fontSize: "0.8em"}}>{looSelected.description}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                        <Badge bg={looSelected.looState === "BUSY" ? ("tertiary text-primary") : ("dark")} className= {!(looSelected.owner.id === idUser) && "h-50"}>{looSelected.looState}</Badge>
                        { looSelected.owner.id !== idUser &&                         <Button className="text-secondary fs-5 fw-medium rounded-pill px-4 shadow-sm " disabled={looSelected.looState === "BUSY" || hasActiveBookings} onClick={() => handleClick(looSelected.id)}>Book</Button>}

                    </div>
                    </Card.Body>
            </>
            ) : (
                <Card.Body className='p-4'>
                    <div className='bg-tertiary h-100 w-100 d-flex justify-content-center align-items-center rounded border-primary' style={{borderStyle: "dashed"}}>
                       <h3 className='text-dark fw-lighter'>No loo selected</h3>
                    </div>
                </Card.Body>
            )}

        </Card>       
    )
}

export default DetailLooSelected