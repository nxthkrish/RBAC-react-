import React from "react";
import {
  FaUsers,
  FaUserShield,
  FaUserFriends,
  FaUserEdit,
  FaUserCheck,
  FaHeartbeat,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import "../../App.css";

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  highlight?: boolean;
  trend?: "up" | "down";
  group?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  highlight,
  trend,
}) => (
  <div className={`dashboard-stats-card${highlight ? " total-users" : ""}`}>
    <div className="stats-icon">{icon}</div>
    <div className="stats-label">{label}</div>
    <div className="stats-value">
      {value}
      {trend === "up" && <FaArrowUp className="stats-trend-up" />}
      {trend === "down" && <FaArrowDown className="stats-trend-down" />}
    </div>
  </div>
);

interface DashboardStatsProps {
  stats: {
    total: number;
    admins: number;
    users: number;
    partners: number;
    active: number;
    inactive: number;
    activeTrend?: "up" | "down";
    inactiveTrend?: "up" | "down";
  };
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => (
  <div className="dashboard-stats-section">
    <StatCard
      label="Total Users"
      value={stats.total}
      icon={<FaUsers />}
      highlight
    />
    <StatCard label="Admins" value={stats.admins} icon={<FaUserShield />} />
    <StatCard label="Users" value={stats.users} icon={<FaUserFriends />} />
    <StatCard label="Partners" value={stats.partners} icon={<FaUserEdit />} />
    <StatCard
      label="Active"
      value={stats.active}
      icon={<FaUserCheck />}
      trend={stats.activeTrend}
    />
    <StatCard
      label="Inactive"
      value={stats.inactive}
      icon={<FaHeartbeat />}
      trend={stats.inactiveTrend}
    />
  </div>
);

export default DashboardStats;
