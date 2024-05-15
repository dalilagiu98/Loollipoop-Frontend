import { useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";

// eslint-disable-next-line react/prop-types
const ImageProfileUpload = ({ handleClose }) => {

    //VARIABLES:
    let token = localStorage.getItem("accessToken")

    //STATE:
    const [file, setFile] = useState();

    //FUNCTIONS:
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    const handleUpload = async () => {
        let formData = new FormData();
        formData.append("avatar", file);

        try {
            let response = await fetch("http://localhost:3001/users/me/avatar", {
                method: "PATCH",
                body: formData,
                headers: {
                    Authorization: "Bearer " + token
                }
            })

            if(response.ok) {
                let data = await response.json();
                console.log(data);
            } else {
                throw new Error("Error in upload image")
            }

        
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
        <Container>
          <Row>
            <Col className="p-3">
              <input
                className="d-block mb-3 form-control rounded-pills"
                type="file"
                onChange={handleFileChange}
                placeholder="No such file uploaded"
              />
              <Button onClick={handleUpload} className="me-2 rounded-pill text-secondary">Upload</Button>
              <Button onClick={handleClose} className="rounded-pill text-secondary">Save & Close</Button>
            </Col>
          </Row>
        </Container>
      </>
    )
}

export default ImageProfileUpload
