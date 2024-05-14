import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <section>
            <Container className="text-center">
                <h1>404: Not Found</h1>
                <p>It's gone :(</p>
                <Link to="/">Back to home</Link>
            </Container>
        </section>
    );
}