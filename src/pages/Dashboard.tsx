import { useEffect, useState } from "react";
import { Card, Spinner, Row, Col } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import DashboardInfoCards from "../components/dashboard/DashboardInfoCards";
import RecentActivity, {
  ActivityItem,
} from "../components/dashboard/RecentActivity";
import { getUsers } from "../api/userService";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<{
    total: number;
    admins: number;
    users: number;
    partners: number;
    active: number;
    inactive: number;
  }>({
    total: 0,
    admins: 0,
    users: 0,
    partners: 0,
    active: 0,
    inactive: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        const users = await getUsers();
        const admins = users.filter((u: any) => u.role === "admin").length;
        const normalUsers = users.filter((u: any) => u.role === "user").length;
        const partners = users.filter((u: any) => u.role === "partner").length;
        const active = users.filter((u: any) => u.status === "active").length;
        const inactive = users.filter(
          (u: any) => u.status === "inactive"
        ).length;
        setStats({
          total: users.length,
          admins,
          users: normalUsers,
          partners,
          active,
          inactive,
        });
        setActivities([
          {
            type: "login",
            user: "Arun Nair",
            time: "2 min ago",
            description: "Logged in as admin",
          },
          {
            type: "create",
            user: "Sneha Warrier",
            time: "10 min ago",
            description: "Added new user",
          },
          {
            type: "edit",
            user: "Rahul Kumar",
            time: "30 min ago",
            description: "Updated profile",
          },
          {
            type: "delete",
            user: "Akhil Menon",
            time: "1 hour ago",
            description: "Deleted user",
          },
        ]);
      } catch (e) {
        setStats({
          total: 0,
          admins: 0,
          users: 0,
          partners: 0,
          active: 0,
          inactive: 0,
        });
        setActivities([]);
      }
      setLoading(false);
    }
    if (user?.role === "admin") fetchStats();
  }, [user]);

  // Company profile image (place your company logo or relevant image in public/assets)
  const companyProfileImg = "/assets/company-profile.png"; // Place your image in public/assets

  // Professional business avatar image (replace with your own if desired)
  const professionalProfileImg =
    "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=256&h=256&facepad=2&q=80";

  // Helper for animated initials avatar
  const getAnimatedInitialsAvatar = (firstName: string, lastName: string) => {
    const initials = `${firstName?.[0] ?? ""}${
      lastName?.[0] ?? ""
    }`.toUpperCase();
    return (
      <div
        className="aceternity-avatar-3d mb-3 mx-auto"
        tabIndex={0}
        style={{ width: 80, height: 80 }}
      >
        <span className="aceternity-avatar-text">{initials}</span>
      </div>
    );
  };

  let dashboardContent = null;
  if (user?.role === "admin") {
    dashboardContent = (
      <>
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: 180 }}
          >
            <Spinner animation="border" variant="info" />
          </div>
        ) : (
          <>
            <div className="d-flex flex-column align-items-center mb-4">
              {getAnimatedInitialsAvatar(user.firstName, user.lastName)}
              <div className="fw-bold fs-4 text-center mb-2">
                Welcome, {user.firstName}
              </div>
            </div>
            <Row className="g-4 mb-4">
              <Col>
                <DashboardInfoCards stats={stats} />
              </Col>
            </Row>
            <Row className="g-4">
              <Col>
                <RecentActivity activities={activities} />
              </Col>
            </Row>
          </>
        )}
      </>
    );
  } else if (user?.role === "user") {
    dashboardContent = (
      <Row className="g-4">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              {getAnimatedInitialsAvatar(user.firstName, user.lastName)}
              <Card.Title className="fw-bold text-center">
                Welcome, {user.firstName}
              </Card.Title>
              <Card.Text className="user-dashboard-info text-center">
                You can view the list of all users and their details. You do not
                have permissions to add, edit, or delete users.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="fw-bold">Browse Users</Card.Title>
              <Card.Text className="user-dashboard-link">
                Go to the User Management section to view user details.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  } else if (user?.role === "partner") {
    // Mock analytics data for partner dashboard
    const mockAnalytics = {
      revenueYTD: "$1,250,000",
      growthRate: "+8.2% YoY",
      topProduct: "Premium SaaS Suite",
      lastMonthRevenue: "$110,000",
      activeClients: 42,
    };

    // Mock data for the analytics graph
    const revenueData = [
      { month: "Jan", revenue: 90000 },
      { month: "Feb", revenue: 95000 },
      { month: "Mar", revenue: 100000 },
      { month: "Apr", revenue: 105000 },
      { month: "May", revenue: 110000 },
      { month: "Jun", revenue: 115000 },
      { month: "Jul", revenue: 120000 },
      { month: "Aug", revenue: 125000 },
      { month: "Sep", revenue: 130000 },
      { month: "Oct", revenue: 128000 },
      { month: "Nov", revenue: 132000 },
      { month: "Dec", revenue: 135000 },
    ];

    dashboardContent = (
      <Row className="g-4">
        <Col md={6}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              {getAnimatedInitialsAvatar(user.firstName, user.lastName)}
              <Card.Title className="fw-bold text-center">
                Welcome, {user.firstName}
              </Card.Title>
              <Card.Text className="text-center" style={{ color: "#e6eaf3" }}>
                You can view and edit your profile details. Access to other
                users' data is restricted.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm mb-4 dashboard-card-hover">
            <Card.Body>
              <Card.Title className="fw-bold text-center mb-3">
                Company Analytics
              </Card.Title>
              <div className="d-flex flex-column gap-2 align-items-center">
                <div>
                  <span className="fw-bold">Revenue (YTD): </span>
                  <span style={{ color: "#0dcaf0", fontWeight: 600 }}>
                    {mockAnalytics.revenueYTD}
                  </span>
                </div>
                <div>
                  <span className="fw-bold">Growth Rate: </span>
                  <span style={{ color: "#28d17c", fontWeight: 600 }}>
                    {mockAnalytics.growthRate}
                  </span>
                </div>
                <div>
                  <span className="fw-bold">Top Product: </span>
                  <span style={{ color: "#f3f6fa" }}>
                    {mockAnalytics.topProduct}
                  </span>
                </div>
                <div>
                  <span className="fw-bold">Last Month Revenue: </span>
                  <span style={{ color: "#0dcaf0", fontWeight: 600 }}>
                    {mockAnalytics.lastMonthRevenue}
                  </span>
                </div>
                <div>
                  <span className="fw-bold">Active Clients: </span>
                  <span style={{ color: "#ffc107", fontWeight: 600 }}>
                    {mockAnalytics.activeClients}
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        {/* Analytics Graph */}
        <Col md={12}>
          <Card className="shadow-sm mb-4 dashboard-card-hover">
            <Card.Body>
              <Card.Title className="fw-bold text-center mb-3">
                Revenue Trend (Monthly)
              </Card.Title>
              <div style={{ width: "100%", height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid stroke="#232e47" strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#b6c1d1" />
                    <YAxis
                      stroke="#b6c1d1"
                      tickFormatter={(v) => `$${v / 1000}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "#23272f",
                        border: "1px solid #0dcaf0",
                        color: "#fff",
                        borderRadius: 10,
                        fontWeight: 500,
                      }}
                      labelStyle={{ color: "#0dcaf0" }}
                      formatter={(value: any) => [
                        `$${value.toLocaleString()}`,
                        "Revenue",
                      ]}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#0dcaf0"
                      strokeWidth={3}
                      dot={{ r: 5, fill: "#0dcaf0" }}
                      activeDot={{ r: 7, fill: "#fd7e14" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }

  return <div className="container-fluid py-4">{dashboardContent}</div>;
};

export default Dashboard;
