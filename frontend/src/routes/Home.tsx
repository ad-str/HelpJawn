import { Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export function Home() {

    return (
        <div className="d-flex justify-content-center">
            <Row className="align-items-center">
                <Col xs={10}>
                    <input type="text" className="form-control" placeholder="Search for a charity" />
                </Col>
                <Col xs={2}>
                    <Button variant="primary">
                        Search
                    </Button>
                </Col>
            </Row>
        </div>
    )
}