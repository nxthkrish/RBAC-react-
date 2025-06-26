import { Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Alert variant="danger" className="text-center">
        <Alert.Heading>404 - Page Not Found</Alert.Heading>
        <p>The page you are looking for does not exist.</p>
        <Button variant="primary" onClick={() => navigate("/")}>
          Go to Home
        </Button>
      </Alert>
    </div>
  );
};

export default NotFound;
