import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { IoSettingsOutline } from "react-icons/io5";
import { TbClipboardText } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { logoutAction } from '../redux/actions/action';
import { useEffect } from 'react';
import { fetchPersonalProfile } from '../redux/actions/action';

const MyNav = function () {
  //SELECTOR:
  const avatarImage = useSelector((state) => {
    return state.getPersonalProfile.userLogged.avatarUrl
  })
  const token = useSelector((state) => {
    return state.loginUser.token 
})
const tokenLocalStorage = localStorage.getItem("accessToken")

  //EFFECT:
  useEffect(()=>{
    if(tokenLocalStorage) {
      dispatch(fetchPersonalProfile())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  //DISPATCH:
  const dispatch = useDispatch()

  //NAVIGATE:
  const navigate = useNavigate()

  //FUNCITONS:
  const handleLogout = () =>{
   dispatch(logoutAction())
   navigate("/welcome") 
  }

  return(
    <Navbar collapseOnSelect expand="md" className="bg-dark py-0 position-fixed top-0 end-0 start-0 z-3">
      <Container fluid>
        <Link to="/" className='navbar-brand'>
          <img src='/logo.png' alt='logo' style={{height: '2em'}}/>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

          <Nav className="me-auto">
            <Link to="/searchByAddress" className='text-white fw-medium nav-link'>Search by address</Link>
            <Link to="/searchByPosition" className='text-white fw-medium nav-link'>Search by position</Link>
          </Nav>
          
          <Nav>

            {avatarImage?  (<NavDropdown title={
                <img src={avatarImage} alt='logo' style={{width: "40px", height:"40px", objectFit: "cover"}} className='rounded-circle'/>
            } id="collapsible-nav-dropdown" className='dropstart'>
              <Link to="/me" className='dropdown-item'><i className="bi bi-person-circle"></i> Account</Link>
              <Link to="/bookings" className='dropdown-item d-flex align-items-center'><TbClipboardText className='me-1'/>Bookings </Link>
              <Link to="/settings" className='dropdown-item d-flex align-items-center'><IoSettingsOutline className='me-1'/>Settings </Link>
              <NavDropdown.Divider />
              <Button onClick={handleLogout} className='dropdown-item'><i className="bi bi-box-arrow-right"></i> Logout</Button>
            </NavDropdown>) : ( <Spinner animation="grow" variant="success" />)}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNav;