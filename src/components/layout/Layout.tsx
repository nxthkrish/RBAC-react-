import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div
      className="d-flex flex-column min-vh-100 w-100 overflow-hidden"
      style={{ minHeight: "100vh", width: "100vw", overflowX: "hidden" }}
    >
      <Header />
      <Row className="flex-grow-1 h-100 g-0" style={{ minHeight: 0 }}>
        <Col
          md={2}
          className="p-0 h-100 bg-sidebar"
          style={{ minHeight: 0, maxWidth: 260, flex: "0 0 220px" }}
        >
          <Sidebar />
        </Col>
        <Col
          md={10}
          className="p-4 h-100"
          style={{ minHeight: 0, overflowX: "auto" }}
        >
          <Container fluid className="p-0">
            <Outlet />
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default Layout;
