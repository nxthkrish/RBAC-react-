import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaUserCircle } from "react-icons/fa";
import Permission from "../common/Permission";
import { useAuth } from "../../hooks/useAuth";
import "./Sidebar.css";

const Sidebar = () => {
  const { user } = useAuth();
  return (
    <Nav className="sidebar flex-column bg-sidebar pt-3 min-vh-100">
      <Nav.Link
        as={NavLink}
        to="/"
        end
        className="d-flex align-items-center mb-2 sidebar-link"
      >
        <FaTachometerAlt className="me-2" /> Dashboard
      </Nav.Link>
      {/* Profile button for all logged-in users */}
      {user && (
        <Nav.Link
          as={NavLink}
          to={`/users/view/${user.id}`}
          className="d-flex align-items-center mb-2 sidebar-link"
        >
          <FaUserCircle className="me-2" /> Profile
        </Nav.Link>
      )}
      {/* View All Users for user role only */}
      <Permission allowedRoles={["user"]}>
        <Nav.Link
          as={NavLink}
          to="/users"
          className="d-flex align-items-center mb-2 sidebar-link"
        >
          <FaUsers className="me-2" /> View All Users
        </Nav.Link>
      </Permission>
      <Permission allowedRoles={["admin"]}>
        <Nav.Link
          as={NavLink}
          to="/users"
          className="d-flex align-items-center mb-2 sidebar-link"
        >
          <FaUsers className="me-2" /> User Management
        </Nav.Link>
      </Permission>
    </Nav>
  );
};

export default Sidebar;
