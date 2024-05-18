import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Spinner, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from 'react';
import { fetchCreateLoos, fetchGetLocation, fetchGetMyLoo } from '../../redux/actions/action';

// eslint-disable-next-line react/prop-types
const AddingLooModal = ({ show, handleClose}) => {

    //VARIABLES:
    const token = localStorage.getItem("accessToken")

    //STATE:
    const [form, setForm] = useState({
       name: "",
       address: "",
       longitude:"",
       latitude: "",
       description: "" 
    })
    const[showDropdown, setShowDropdown] = useState(false)
    const [debouncedAddress, setDebouncedAddress] = useState('');
    const[file, setFile] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);

    //SELECTOR:
    const resultsResearch = useSelector((state) => {
        return state.getLocation.locationGetted
    })
    const isFormLoading = useSelector((state) => {
        return state.createLoo.isLoading
    })
    const isFormLoaded = useSelector((state) => {
        return state.createLoo.isLoaded
    })
    const isFormError = useSelector((state) => {
        return state.createLoo.isError
    })
    const idNewLoo = useSelector((state) => {
        return state.createLoo.newLoo.id
    })
    //DISPATCH:
    const dispatch = useDispatch()

    //FUNCTIONS:
    const handleInputChange =  (e) => {
        const value = e.target.value;
        setForm({
            ...form,
            address: value
        })
        setShowDropdown(value.trim().length > 0 )
    }

    const handleClick = (result) =>{
        setForm({
            ...form,
            address: result.label,
            longitude: result.longitude,
            latitude: result.latitude
        })
        setShowDropdown(false)
    }

    const handleSaveLoo = async (e) => {
        e.preventDefault();
        dispatch(fetchCreateLoos(form))
    }

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    const handleUpload = async () =>{
        let formData = new FormData();
        formData.append("looImage", file);
        setIsLoading(true)
        try {
            let response = await fetch("http://localhost:3001/loos/myLoos/"+ idNewLoo + "/looImage", {
               method: "PATCH",
               body: formData,
               headers: {
                Authorization: "Bearer " + token
               } 
            })

            if(response.ok) {
                let data = await response.json()
                console.log(data);
                setIsLoading(false);
                setIsLoaded(true);
                dispatch(fetchGetMyLoo())
            } else {
                setIsLoading(false)
                setIsError(true)
                throw new Error("Error in upload loo image")
            }
        } catch (err) {
            console.log(err)
        }
    }


    //EFFECT:
    useEffect(() => {
        const handler = setTimeout(() => {
            if (form.address && form.address.trim()) {
                setDebouncedAddress(form.address)
            }
        }, 500)

        return () => {
            clearTimeout(handler)
        } 
    }, [form.address])

    useEffect(() => {
        if(debouncedAddress) {
            dispatch(fetchGetLocation(debouncedAddress))
        }
    }, [debouncedAddress, dispatch])



    return (
        <Modal show={show} onHide={handleClose} className="border border-primary">

        <Modal.Header className="bg-tertiary mb-3 border border-primary">
          <Modal.Title className="text-dark display-6 ">Add a Loo</Modal.Title>
        </Modal.Header>

        <Modal.Body className='text-dark fw-mediums'>Here you can insert the details of your loo:
            <Form>
                    <p className='p-0 m-0 fs-5 ms-1 text-dark fw-medium'>Name:</p>
                    <Form.Control className='mb-4'
                    required
                    placeholder="My Loo in NYC"
                    value={form.name}
                    onChange={(e) => 
                        setForm({
                            ...form,
                            name: e.target.value
                        })
                    }
                    />

                    <p className='p-0 m-0 fs-5 ms-1 text-dark fw-medium'>Address:</p>
                    <Form.Control className='mb-4'
                    // required
                    placeholder="543 5th Ave, New York, NY 10017, United States"
                    value={form.address}
                    onChange={handleInputChange}
                    />
                    <ListGroup className='position-absolute' style={{ top: "50%",width: "94%"}}>
                    {
                        showDropdown && resultsResearch && resultsResearch.map((result) => (
                            <ListGroup.Item className='d-flex' key={result.longitude + "-" + result.latitude } onClick={() => handleClick(result)}>{result.label}</ListGroup.Item>
                        )) 
                    }
                    </ListGroup> 

                    <p className='p-0 m-0 fs-5 ms-1 text-dark fw-medium'>Description:</p>
                    <Form.Control className='mb-4'
                    required
                    placeholder="Example: The doorbell is not working, not accessible to disabled individuals, etc. "
                    as="textarea"
                    value={form.description}
                    onChange={(e) => setForm({
                        ...form,
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
                    <Button className="text-primary border border-primary fs-5 fw-medium rounded-pill px-4 shadow-sm "type='submit' variant="secondary" onClick={handleSaveLoo}>
                    Upload details
                    </Button>
                    {
                        isFormLoaded && (
                        <>
                            <p className='mt-3 mb-1'> Here you have to insert an image for your loo:</p>
                            <InputGroup className="mb-4 roundend-pill" >
                            <Form.Control
                            onChange={handleFileChange}
                            label="Choose file"
                            className="rounded-pill"
                            type="file"
                            />
                            </InputGroup>
                            <div className="d-flex justify-content-center mb-2">
                            {
                                isLoading && <Spinner animation="border" size="sm" variant="primary"/>
                            }
                            {
                                !isLoading && isLoaded && !isError &&  <h6 className="text-dark fw-medium">Uploaded!</h6>
                            }
                            {
                                !isLoading && isError && <h6 className="text-dark fw-medium">Error to upload file!</h6>
                            }
                            </div>
                        </> 
                    )
                    }

            </Form>
        </Modal.Body>


        <Modal.Footer>

          <Button className="text-primary border border-primary fs-5 fw-medium rounded-pill px-4 shadow-sm " variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button className=" text-secondary border border-secondary fs-5 fw-medium rounded-pill px-4 shadow-sm" onClick={handleUpload} disabled={!isFormLoaded && !file}>
            Save Changes
          </Button>

        </Modal.Footer>


      </Modal>
    )
}

export default AddingLooModal