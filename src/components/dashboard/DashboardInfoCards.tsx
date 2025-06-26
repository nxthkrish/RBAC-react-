// DashboardInfoCards.tsx
import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import {
  FaUsers,
  FaUserShield,
  FaUserFriends,
  FaHeartbeat,
  FaUserEdit,
  FaUserCheck,
} from "react-icons/fa";
import "./DashboardInfoCards.css";

interface InfoCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  description?: string;
  animate?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  value,
  icon,
  color,
  description,
  animate,
}) => (
  <div className={`dashboard-info-card ${animate || ""}`}>
    <Card
      className="dashboard-card-hover"
      style={{ borderLeft: `6px solid ${color}` }}
    >
      <Card.Body className="d-flex align-items-center gap-3">
        <div className="dashboard-info-icon" style={{ color }}>
          {icon}
        </div>
        <div>
          <Card.Title className="mb-1 fs-5 fw-semibold">{title}</Card.Title>
          <div className="fs-3 fw-bold" style={{ color }}>
            {value}
          </div>
        </div>
      </Card.Body>
    </Card>
  </div>
);

interface DashboardInfoCardsProps {
  stats: {
    total: number;
    admins: number;
    users: number;
    partners: number;
    active: number;
    inactive: number;
  };
}

const DashboardInfoCards: React.FC<DashboardInfoCardsProps> = ({ stats }) => (
  <Row className="g-4 mb-4 dashboard-info-row">
    <Col md={4} sm={6} xs={12}>
      <InfoCard
        title="Total Users"
        value={stats.total}
        icon={<FaUsers size={32} />}
        color="#0dcaf0"
        animate="fade-in"
      />
    </Col>
    <Col md={4} sm={6} xs={12}>
      <InfoCard
        title="Admins"
        value={stats.admins}
        icon={<FaUserShield size={32} />}
        color="#31d2f2"
        animate="pop-in"
      />
    </Col>
    <Col md={4} sm={6} xs={12}>
      <InfoCard
        title="Users"
        value={stats.users}
        icon={<FaUserFriends size={32} />}
        color="#20c997"
        animate="slide-in"
      />
    </Col>
    <Col md={4} sm={6} xs={12}>
      <InfoCard
        title="Partners"
        value={stats.partners}
        icon={<FaUserEdit size={32} />}
        color="#fd7e14"
        animate="fade-in"
      />
    </Col>
    <Col md={4} sm={6} xs={12}>
      <InfoCard
        title="Active"
        value={stats.active}
        icon={<FaUserCheck size={32} />}
        color="#198754"
        animate="pop-in"
      />
    </Col>
    <Col md={4} sm={6} xs={12}>
      <InfoCard
        title="Inactive"
        value={stats.inactive}
        icon={<FaHeartbeat size={32} />}
        color="#dc3545"
        animate="slide-in"
      />
    </Col>
  </Row>
);

export default DashboardInfoCards;
