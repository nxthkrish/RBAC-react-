// SystemHealthCard.tsx
import React from "react";
import { Card, ProgressBar } from "react-bootstrap";
import { FaHeartbeat, FaServer } from "react-icons/fa";

interface SystemHealthCardProps {
  healthy: boolean;
  uptime: string;
  load: number;
}

const SystemHealthCard: React.FC<SystemHealthCardProps> = ({
  healthy,
  uptime,
  load,
}) => (
  <Card className="dashboard-card mb-4 animate-fade-in">
    <Card.Body className="d-flex align-items-center">
      <div
        className="dashboard-info-icon me-3"
        style={{ color: healthy ? "#20c997" : "#dc3545" }}
      >
        <FaHeartbeat size={32} />
      </div>
      <div>
        <Card.Title className="mb-1">System Health</Card.Title>
        <div className="d-flex align-items-center mb-2">
          <FaServer className="me-2" />
          <span className={healthy ? "text-success" : "text-danger"}>
            {healthy ? "Healthy" : "Issues Detected"}
          </span>
        </div>
        <div className="mb-1">
          <strong>Uptime:</strong> {uptime}
        </div>
        <div className="mb-1">
          <strong>Load:</strong>{" "}
          <ProgressBar
            now={load}
            label={`${load}%`}
            variant={load < 70 ? "success" : load < 90 ? "warning" : "danger"}
            style={{ minWidth: 120 }}
          />
        </div>
      </div>
    </Card.Body>
  </Card>
);

export default SystemHealthCard;
