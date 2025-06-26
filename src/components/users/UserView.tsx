import { Card, ListGroup, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "../../types/user";
import { getUser } from "../../api/userService";
import { useAuth } from "../../hooks/useAuth";

const UserView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user: authUser } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser(id!);
        setUser(data);
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>User not found</div>;

  // Partner can only view their own details
  if (authUser?.role === "partner" && authUser.id !== user.id) {
    return <div>You do not have permission to view this user.</div>;
  }

  // Helper for initials avatar
  const initials = `${user.firstName?.[0] ?? ""}${
    user.lastName?.[0] ?? ""
  }`.toUpperCase();

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "60vh" }}
    >
      <Card
        className="shadow-lg border-0"
        style={{
          background: "linear-gradient(120deg, #202945 60%, #1e2634 100%)",
          borderRadius: "2rem",
          minWidth: 420,
          maxWidth: 700,
          width: "100%",
          padding: "0",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 10,
            borderTopLeftRadius: "2rem",
            borderBottomLeftRadius: "2rem",
            background: "linear-gradient(180deg, #0dcaf0 0%, #0a58ca 100%)",
          }}
        />
        <div className="row g-0" style={{ minHeight: 260 }}>
          {/* Left: Avatar and name */}
          <div className="col-12 col-md-4 d-flex flex-column align-items-center justify-content-center py-4 px-3">
            <div
              className="rounded-circle shadow"
              style={{
                width: 90,
                height: 90,
                background:
                  "linear-gradient(135deg, #0dcaf0 60%, #0a58ca 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 38,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 18,
                boxShadow: "0 4px 24px #0dcaf055",
                letterSpacing: 2,
              }}
            >
              {initials}
            </div>
            <div
              className="fw-bold fs-4 text-center mb-1"
              style={{ color: "#f3f6fa" }}
            >
              {user.firstName} {user.lastName}
            </div>
            <div className="mb-2">
              <span
                className={`badge bg-${
                  user.role === "admin"
                    ? "primary"
                    : user.role === "user"
                    ? "info"
                    : "secondary"
                }`}
                style={{
                  color: user.role === "user" ? "#181c24" : "#fff",
                  background:
                    user.role === "admin"
                      ? "#0dcaf0"
                      : user.role === "user"
                      ? "#31d2f2"
                      : "#6c757d",
                  fontWeight: 600,
                  fontSize: "1em",
                  marginRight: 6,
                }}
              >
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
              <span
                className={`badge ${
                  user.status === "active" ? "bg-success" : "bg-secondary"
                }`}
                style={{
                  color: "#fff",
                  background: user.status === "active" ? "#198754" : "#6c757d",
                  fontWeight: 600,
                  fontSize: "1em",
                }}
              >
                {user.status}
              </span>
            </div>
          </div>
          {/* Right: Details */}
          <div className="col-12 col-md-8 d-flex flex-column justify-content-center px-4 py-4">
            <ListGroup variant="flush" className="mb-3">
              <ListGroup.Item
                style={{
                  background: "transparent",
                  color: "#e6eaf3",
                  border: "none",
                  borderBottom: "1px solid #28304a",
                  fontSize: "1.08em",
                }}
              >
                <strong style={{ color: "#0dcaf0" }}>Email:</strong>{" "}
                <span style={{ color: "#f3f6fa" }}>{user.email}</span>
              </ListGroup.Item>
              <ListGroup.Item
                style={{
                  background: "transparent",
                  color: "#e6eaf3",
                  border: "none",
                  borderBottom: "1px solid #28304a",
                  fontSize: "1.08em",
                }}
              >
                <strong style={{ color: "#0dcaf0" }}>Role:</strong>{" "}
                <span style={{ color: "#f3f6fa" }}>{user.role}</span>
              </ListGroup.Item>
              <ListGroup.Item
                style={{
                  background: "transparent",
                  color: "#e6eaf3",
                  border: "none",
                  borderBottom: "1px solid #28304a",
                  fontSize: "1.08em",
                }}
              >
                <strong style={{ color: "#0dcaf0" }}>Status:</strong>{" "}
                <span
                  className={`badge ${
                    user.status === "active" ? "bg-success" : "bg-secondary"
                  }`}
                  style={{
                    color: "#fff",
                    background:
                      user.status === "active" ? "#198754" : "#6c757d",
                    fontWeight: 600,
                    fontSize: "1em",
                  }}
                >
                  {user.status}
                </span>
              </ListGroup.Item>
              <ListGroup.Item
                style={{
                  background: "transparent",
                  color: "#e6eaf3",
                  border: "none",
                  borderBottom: "1px solid #28304a",
                  fontSize: "1.08em",
                }}
              >
                <strong style={{ color: "#0dcaf0" }}>Contact No:</strong>{" "}
                <span style={{ color: "#f3f6fa" }}>{user.contactNo}</span>
              </ListGroup.Item>
              <ListGroup.Item
                style={{
                  background: "transparent",
                  color: "#e6eaf3",
                  border: "none",
                  fontSize: "1.08em",
                }}
              >
                <strong style={{ color: "#0dcaf0" }}>Address:</strong>{" "}
                <span style={{ color: "#f3f6fa" }}>{user.address}</span>
              </ListGroup.Item>
            </ListGroup>
            <div className="d-flex justify-content-end">
              <Button
                variant="outline-info"
                onClick={() => navigate("/users")}
                className="fw-bold px-4 py-2"
                style={{
                  borderRadius: "1.2rem",
                  fontSize: "1.08em",
                  borderWidth: 2,
                  borderColor: "#0dcaf0",
                  color: "#0dcaf0",
                  background: "transparent",
                  transition: "background 0.18s, color 0.18s",
                }}
              >
                &#8592; Back to List
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserView;
