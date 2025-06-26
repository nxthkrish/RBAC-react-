import { Form, Button, Card, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { LoginCredentials } from "../../types/user";
import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cardAnimated, setCardAnimated] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();

  const onSubmit = async (data: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);
      await login(data);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger animation on mount
  useEffect(() => {
    setTimeout(() => setCardAnimated(true), 100);
  }, []);

  return (
    <div className="animated-login-bg d-flex justify-content-center align-items-center">
      <div
        className="d-flex justify-content-center align-items-center vh-100 w-100"
        style={{ position: "relative", zIndex: 2 }}
      >
        <Card
          className={`animated-login-card${
            cardAnimated ? " animated-login-card-in" : ""
          }`}
        >
          <Card.Body>
            <div className="text-center mb-4">
              <Card.Title
                className="fw-bold"
                style={{ fontSize: "1.7rem", letterSpacing: "1px" }}
              >
                Welcome
              </Card.Title>
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  autoComplete="username"
                  {...register("email", { required: "Email is required" })}
                  isInvalid={!!errors.email}
                  placeholder="your@email.com"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  autoComplete="current-password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  isInvalid={!!errors.password}
                  placeholder="Password"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login;
