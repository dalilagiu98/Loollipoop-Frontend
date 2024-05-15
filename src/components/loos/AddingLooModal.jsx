import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// eslint-disable-next-line react/prop-types
const AddingLooModal = ({ show, handleClose}) => {
    return (
        <Modal show={show} onHide={handleClose} className="border border-primary">
        <Modal.Header className="bg-tertiary mb-3 border border-primary">
          <Modal.Title className="text-dark display-6 ">Add a Loo</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-dark fw-mediums'>Here you can insert the details of your loo:</Modal.Body>
        <Modal.Footer>
          <Button className="text-primary border border-primary fs-5 fw-medium rounded-pill px-4 shadow-sm " variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className=" text-secondary border border-secondary fs-5 fw-medium rounded-pill px-4 shadow-sm" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default AddingLooModal