import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChangeLooDetails, fetchGetLocation } from '../../redux/actions/action';
import { useParams } from 'react-router-dom';


const ChangeLooDetailModal = ({handleCloseDetail, show}) => {

    //SELECTOR:
    const nameLoo = useSelector((state) => {
        return state.getLooById.looFound.name
    })
    const addressLoo = useSelector((state) => {
        return state.getLooById.looFound.address
    })
    const longitudeLoo = useSelector((state) => {
        return state.getLooById.looFound.longitude
    })
    const latitudeLoo = useSelector((state) => {
        return state.getLooById.looFound.latitude
    })
    const descriptionLoo = useSelector((state) => {
        return state.getLooById.looFound.description
    })

    //STATE:
    const [inputForm, setInputForm] = useState({
        name: nameLoo,
        address: addressLoo,
        longitude: longitudeLoo,
        latitude: latitudeLoo,
        description: descriptionLoo
    })
    const [showDropdown, setShowDropdown] = useState(false)
    const [debouncedAddress, setDebouncedAddress] = useState('');

    //SELECTOR:
    const resultsResearch = useSelector((state) => {
        return state.getLocation.locationGetted
    })
    const isFormLoading = useSelector((state) => {
        return state.getLooById.isLoadingDetails
    })
    const isFormLoaded = useSelector((state) => {
        return state.getLooById.isLoadedDetails
    })
    const isFormError = useSelector((state) => {
        return state.getLooById.isErrorDetails
    })

    //DISPATCH:
    const dispatch = useDispatch()

    //PARAMS:
    const params = useParams()

    //FUNCTIONS:
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputForm({
            ...inputForm,
            address: value
        })
        setShowDropdown(value.trim().length > 0)
    }
    const handleClick = (result) => {
        setInputForm({
            ...inputForm,
            address: result.label,
            longitude: result.longitude,
            latitude: result.latitude
        })
        setShowDropdown(false)
    }
    const handleUpload = async () => {
        dispatch(fetchChangeLooDetails(params.looId, inputForm))
    }

    //EFFECT:
    useEffect(()=> {
        const handler = setTimeout(() => {
            if (inputForm.address && inputForm.address.trim()) {
                setDebouncedAddress(inputForm.address)
            }
        }, 500)

        return () => {
            clearTimeout(handler)
        }
    }, [inputForm.address])

    useEffect(() => {
        if(debouncedAddress) {
            dispatch(fetchGetLocation(debouncedAddress))
        }
    }, [debouncedAddress, dispatch])


    return (
        <Modal show={show} onHide={handleCloseDetail} className="border border-primary">

        <Modal.Header className="bg-tertiary mb-3 border border-primary">
          <Modal.Title className="text-dark display-6 ">Modify Loo</Modal.Title>
        </Modal.Header>

        <Modal.Body className='text-dark fw-mediums'>Here you can insert the details of your loo:
            <Form>
                    <p className='p-0 m-0 fs-5 ms-1 text-dark fw-medium'>Name:</p>
                    <Form.Control className='mb-4'
                    required
                    placeholder="My Loo in NYC"
                    value={inputForm.name}
                    onChange={(e) => 
                        setInputForm({
                            ...inputForm,
                            name: e.target.value
                        })
                    }
                    />

                    <p className='p-0 m-0 fs-5 ms-1 text-dark fw-medium'>Address:</p>
                    <Form.Control className='mb-4'
                    // required
                    placeholder="543 5th Ave, New York, NY 10017, United States"
                    value={inputForm.address}
                    onChange={handleInputChange}
                    />
                    <ListGroup className='position-relative ' >
                    {
                        showDropdown && resultsResearch && resultsResearch.map((result) => (
                            <ListGroup.Item className='d-flex position-absolute' style={{ top: "-20px",width: "100%"}}key={result.longitude + "-" + result.latitude } onClick={() => handleClick(result)}>{result.label}</ListGroup.Item>
                        )) 
                    }
                    </ListGroup> 

                    <p className='p-0 m-0 fs-5 ms-1 text-dark fw-medium'>Description:</p>
                    <Form.Control className='mb-4'
                    required
                    placeholder="Example: The doorbell is not working, not accessible to disabled individuals, etc. "
                    as="textarea"
                    value={inputForm.description}
                    onChange={(e) => setInputForm({
                        ...inputForm,
                        description: e.target.value
                    })}
                    />
                    <div className="d-flex justify-content-center mb-2">
                    {
                        isFormLoading && <Spinner animation="border" size="sm" variant="primary"/>
                    }
                    {
                        !isFormLoading && isFormLoaded && !isFormError &&  <h6 className="text-dark fw-medium">Uploaded!</h6>
                    }
                    {
                        !isFormLoading && isFormError && <h6 className="text-dark fw-medium">Error to upload file!</h6>
                    }
                    </div>
            </Form>
        </Modal.Body>


        <Modal.Footer>

          <Button className="text-primary border border-primary fs-5 fw-medium rounded-pill px-4 shadow-sm " variant="secondary" onClick={handleCloseDetail}>
            Close
          </Button>

          <Button className=" text-secondary border border-secondary fs-5 fw-medium rounded-pill px-4 shadow-sm" onClick={handleUpload}>
            Save Changes
          </Button>

        </Modal.Footer>


      </Modal>
    )

}
    
ChangeLooDetailModal.propTypes = {
    handleCloseDetail: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
}

export default ChangeLooDetailModal