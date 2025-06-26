import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const { user, logout } = useAuth();

  // Always clear user on app load to force login
  // (This will clear localStorage and force login page on every browser open)
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
  }

  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      className="shadow-sm py-2 border-bottom border-3 border-info"
    >
      <Container fluid>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          {/* <img src="/logo.png" alt="Logo" height="32" className="me-2" /> */}
          <span className="fw-bold fs-3 text-gradient">RBAC System</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {user && (
              <NavDropdown
                title={
                  <span className="d-flex align-items-center">
                    <FaUserCircle size={28} className="me-2" />
                    <span className="fw-semibold">
                      {user.firstName} {user.lastName}{" "}
                      <span className="badge bg-info text-dark ms-2">
                        {user.role}
                      </span>
                    </span>
                  </span>
                }
                id="user-nav-dropdown"
                align="end"
                className="user-dropdown"
              >
                <NavDropdown.Item disabled>
                  Signed in as <br />
                  <span className="fw-bold">{user.email}</span>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={logout}
                  className="text-danger fw-bold"
                >
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
