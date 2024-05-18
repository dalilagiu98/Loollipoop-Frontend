import { Col, Container, Row } from "react-bootstrap";
import MapComponent from "./MapComponent";
import { useState } from "react";
import DetailLooSelected from "./DetailLooSelected";

const SearchByPosition = () => {

    //STATE:
    const [looSelected, setLooSelected] = useState(null)
    const changeLoo = (loo) => setLooSelected(loo)

    return (
        <Container className="mt-5 mb-5">
            <Row>
                <Col className="mt-4 mb-5">
                    <h1 className="display-1 fw-medium text-center text-md-end">Search nearby</h1>
                </Col>                
            </Row>
            <Row>
                <Col xs={12} md={7} className="mb-5">
                    <MapComponent changeLoo={changeLoo}/>
                </Col>
                <Col xs={12} md={5}>
                    <DetailLooSelected looSelected={looSelected} />
                </Col>
            </Row>
        </Container>
    )
}

export default SearchByPosition