import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "../../index.css"; // Ensure global CSS is loaded

const Layout = () => {
  const location = useLocation();

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
            <SwitchTransition>
              <CSSTransition
                key={location.pathname}
                classNames="page-fade"
                timeout={300}
                unmountOnExit
              >
                <div>
                  <Outlet />
                </div>
              </CSSTransition>
            </SwitchTransition>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default Layout;
