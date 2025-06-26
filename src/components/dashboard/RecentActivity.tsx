// RecentActivity.tsx
import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import {
  FaUserPlus,
  FaUserEdit,
  FaUserTimes,
  FaSignInAlt,
} from "react-icons/fa";

export interface ActivityItem {
  type: "login" | "create" | "edit" | "delete";
  user: string;
  time: string;
  description: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

const iconMap = {
  login: <FaSignInAlt color="#0dcaf0" />,
  create: <FaUserPlus color="#20c997" />,
  edit: <FaUserEdit color="#fd7e14" />,
  delete: <FaUserTimes color="#dc3545" />,
};

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => (
  <Card className="dashboard-card-hover animate-fade-in mb-3">
    <Card.Body>
      <Card.Title className="mb-3">Recent Activity</Card.Title>
      <ul className="list-unstyled mb-0">
        {activities.length === 0 && (
          <li className="mb-3 text-muted">No recent activity</li>
        )}
        {activities.map((activity, idx) => (
          <li key={idx} className="mb-3 d-flex align-items-start gap-2">
            <span className={`activity-icon activity-${activity.type}`}></span>
            <div>
              <div className="fw-semibold">{activity.user}</div>
              <div className="small text-muted">{activity.description}</div>
              <div className="small text-secondary">{activity.time}</div>
            </div>
          </li>
        ))}
      </ul>
    </Card.Body>
  </Card>
);

export default RecentActivity;
