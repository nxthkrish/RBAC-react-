import { Form, Button, Card, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { LoginCredentials } from "../../types/user";
import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cardAnimated, setCardAnimated] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [shakeEmail, setShakeEmail] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
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

  // Add effect to trigger shake animation on invalid email format
  useEffect(() => {
    if (errors.email && emailInputRef.current) {
      setShakeEmail(true);
      const timer = setTimeout(() => setShakeEmail(false), 400);
      return () => clearTimeout(timer);
    }
  }, [errors.email]);

  return (
    <div className="animated-login-bg d-flex justify-content-center align-items-center">
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          padding: "2vw",
        }}
      >
        <Card
          className={`animated-login-card${
            cardAnimated ? " animated-login-card-in" : ""
          }`}
          style={{
            width: "100%",
            maxWidth: 400,
            minWidth: 0,
            margin: "0 auto",
            boxSizing: "border-box",
          }}
        >
          <Card.Body>
            <div className="text-center mb-4">
              {/* Company Logo Placeholder */}
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsCedpRPwINJPOHupQkv24jwi4qWJCoodu_A&s"
                alt="Company Logo"
                style={{
                  maxWidth: "90px",
                  width: "30vw",
                  height: "auto",
                  marginBottom: "1rem",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                  objectFit: "contain",
                  borderRadius: "1.5rem",
                  background:
                    "linear-gradient(135deg,rgb(26, 33, 53) 60%,rgb(27, 48, 82) 100%)",
                  boxShadow: "0 2px 12px #0dcaf033",
                  padding: "0.5rem",
                }}
              />
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
                <Form.Label style={{ color: "#e6eaf3" }}>Email</Form.Label>
                <Form.Control
                  type="email"
                  autoComplete="username"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",
                    },
                  })}
                  isInvalid={!!errors.email}
                  placeholder="Enter your email"
                  ref={(e) => {
                    register("email").ref(e);
                    emailInputRef.current = e;
                  }}
                  className={shakeEmail ? "shake-horizontal" : ""}
                  onBlur={() => trigger("email")}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#e6eaf3" }}>Password</Form.Label>
                <Form.Control
                  type="password"
                  autoComplete="current-password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  isInvalid={!!errors.password}
                  placeholder="Enter your password"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
                <div className="d-flex justify-content-end">
                  <a
                    href="#"
                    style={{
                      fontSize: "0.97em",
                      color: "#0dcaf0",
                      textDecoration: "underline",
                      marginTop: "0.2rem",
                    }}
                    tabIndex={0}
                  >
                    Forgot Password?
                  </a>
                </div>
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
