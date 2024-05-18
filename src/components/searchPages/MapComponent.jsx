import { MapContainer, TileLayer, Marker, Popup, useMap  } from "react-leaflet"
import L from 'leaflet';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Badge } from "react-bootstrap"
import { CiLocationOn } from "react-icons/ci";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { fetchGetNearbyLoo } from "../../redux/actions/action";
delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
//   iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
// });
const tokenMap = import.meta.env.VITE_MAPS_TOKEN;

const customIconLoos = new L.icon({
    iconUrl: `https://api.geoapify.com/v1/icon/?type=material&color=%23fd8c9b&icon=toilet&iconType=awesome&strokeColor=%23fd6b7d&shadowColor=%23512424&scaleFactor=2&apiKey=` + tokenMap,
    iconSize: [31, 46],
    iconAnchor: [15.5, 42],
    popupAnchor: [0, -45],
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
})

const customIconPosition = new L.icon({
    iconUrl: `https://api.geoapify.com/v1/icon/?type=material&color=%23fd6b7d&icon=poop&iconType=awesome&strokeColor=%23fd6b7d&shadowColor=%23512424&scaleFactor=2&apiKey=` + tokenMap,
    iconSize: [31, 46],
    iconAnchor: [15.5, 42],
    popupAnchor: [0, -45],
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
})

// Component to update map view
// eslint-disable-next-line react/prop-types
const UpdateMapCenter = ({ position }) => {
    const map = useMap();
    useEffect(() => {
      if (position) {
        map.setView(position);
      }
    }, [map, position]);
    return null;
};

// eslint-disable-next-line react/prop-types
const MapComponent = ({ changeLoo}) => {

    //STATE:
    const [currentPosition, setCurrentPosition] = useState(null)
    console.log("Current position: " + currentPosition)
    //DISPATCH:
    const dispatch = useDispatch()

    //SELECTOR:
    const loosNearby = useSelector((state) => {
        return state.getNearbyLoo.loosNearby
    })

    //EFFECT:
    useEffect(() => {
        //Get current location:
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setCurrentPosition([position.coords.latitude, position.coords.longitude]);
            },
            (error) => {
              console.error('Error obtaining location', error);
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
    }, [])

    useEffect(() => {
        if (currentPosition) {
          console.log("Dispatching action to fetch nearby loos");
          const latPrefix = currentPosition[0].toString().substring(0, 4);
          const longPrefix = currentPosition[1].toString().substring(0, 4);
          dispatch(fetchGetNearbyLoo(latPrefix, longPrefix));
        }
    }, [currentPosition, dispatch]);

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
        <MapContainer center={currentPosition || [51.505, -0.09]} zoom={15} style={{ height: '70vh', width: '100%', zIndex: "0" }}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {currentPosition && (
            <>
            <UpdateMapCenter position={currentPosition} />
            <Marker position={currentPosition} icon={customIconPosition}>
            <Popup>
               Your position
            </Popup>
            </Marker>
            </>
            )}
            {loosNearby && (
                loosNearby.map((loo, index) => (
                <Marker key={index} position={[loo.latitude, loo.longitude]} icon={customIconLoos}>
                    <Popup>
                    <Card className="h-100 border-0 shadow" style={{width: "12rem", cursor: "pointer"}} onClick={() => changeLoo(loo)}>
                        <Card.Img variant="top" src={loo.imageLoo} />
                        <Card.Body className="d-flex flex-column">
                            <Card.Title className="text-dark fw-medium mb-0 fs-6">{loo.name}</Card.Title>
                            <Card.Text style={{fontSize: "1em"}} className="text-dark mt-1 fw-light"><CiLocationOn />{loo.address}</Card.Text>
                                <div className="d-flex justify-content-between ">
                                    <Badge bg={loo.looState === "BUSY" ? ("tertiary text-primary") : ("dark")}>{loo.looState}</Badge>
                                    <Card.Text>{generateRatingIcons(loo.rate)}</Card.Text>
                                </div>
                        </Card.Body>
                    </Card >
                    </Popup>
                </Marker>
                ))
            )}
      </MapContainer>
    )
}

export default MapComponent