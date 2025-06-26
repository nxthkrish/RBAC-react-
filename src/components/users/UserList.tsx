import { useState, useEffect } from "react";
import { User, UserRole } from "../../types/user";
import { getUsers, deleteUser } from "../../api/userService";
import {
  Button,
  DropdownButton,
  Dropdown,
  InputGroup,
  Form,
  Pagination,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DeleteSuccessModal from "./DeleteSuccessModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { useAuth } from "../../hooks/useAuth";

const UserList = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [roleFilter, setRoleFilter] = useState<UserRole | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(12); // Default 12 cards per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filtering and sorting logic
  let filteredData = users;
  if (statusFilter)
    filteredData = filteredData.filter((u) => u.status === statusFilter);
  if (roleFilter)
    filteredData = filteredData.filter((u) => u.role === roleFilter);
  if (globalFilter)
    filteredData = filteredData.filter(
      (u) =>
        u.firstName.toLowerCase().includes(globalFilter.toLowerCase()) ||
        u.lastName.toLowerCase().includes(globalFilter.toLowerCase()) ||
        u.email.toLowerCase().includes(globalFilter.toLowerCase())
    );
  if (sortOrder) {
    filteredData = [...filteredData].sort((a, b) => {
      const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
      const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
  }

  // Permission logic
  // If partner, only show their own details (and only allow edit for self)
  if (user?.role === "partner") {
    filteredData = users.filter((u) => u.id === user.id);
  }

  // If user, allow view of all, but no add/edit/delete
  const canAdd = user?.role === "admin";
  const canEdit = user?.role === "admin" || user?.role === "partner";
  const canDelete = user?.role === "admin";

  // Handlers
  const handleAdd = () => {
    navigate("/users/add");
  };
  const handleEdit = (u: User) => {
    navigate(`/users/edit/${u.id}`);
  };
  const handleDelete = (userId: string) => {
    const u = users.find((u) => u.id === userId) || null;
    setUserToDelete(u);
    setShowConfirmModal(true);
  };
  const handleView = (userId: string) => {
    navigate(`/users/view/${userId}`);
  };
  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      await deleteUser(userToDelete.id);
      setUsers(users.filter((u) => u.id !== userToDelete.id));
      setShowConfirmModal(false);
      setShowDeleteModal(true);
      setUserToDelete(null);
    } catch (err) {
      setError("Failed to delete user");
      setShowConfirmModal(false);
    }
  };

  // Professional business avatar image (replace with your own if desired)
  const professionalProfileImg =
    "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=256&h=256&facepad=2&q=80";

  // Reset to first page if filters change
  useEffect(() => {
    setPageIndex(0);
  }, [globalFilter, statusFilter, roleFilter, sortOrder, users]);

  // Pagination logic
  const pageCount = Math.ceil(filteredData.length / pageSize);
  const pagedData = filteredData.slice(
    pageIndex * pageSize,
    (pageIndex + 1) * pageSize
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="user-mgmt-bg py-4 px-2 px-md-4">
      <div className="user-mgmt-header d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4 gap-3">
        <div className="d-flex align-items-center gap-3">
          <div>
            <h2 className="fw-bold mb-1" style={{ color: "#f3f6fa" }}>
              User Management
            </h2>
            <div className="small" style={{ color: "#fff" }}>
              Manage users, roles, and permissions in your organization.
            </div>
          </div>
        </div>
        {canAdd && (
          <Button
            variant="primary"
            className="user-mgmt-add-btn d-flex align-items-center gap-2 shadow-sm"
            onClick={handleAdd}
            style={{ minWidth: 120 }}
          >
            Add User
          </Button>
        )}
      </div>
      <div
        className="user-mgmt-card-container bg-dashboard p-4 rounded-4 shadow-lg position-relative"
        style={{
          background: "#1e2634",
          borderRadius: "1.5rem",
          boxShadow: "0 2px 24px rgba(24,31,47,0.10)",
        }}
      >
        <div className="d-flex flex-wrap gap-2 mb-4 align-items-center justify-content-between">
          <InputGroup style={{ minWidth: 220, flex: 1, maxWidth: 320 }}>
            <Form.Control
              placeholder="Search users..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(String(e.target.value))}
            />
          </InputGroup>
          <DropdownButton
            id="status-dropdown"
            title={
              statusFilter
                ? statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)
                : "Status"
            }
            variant="outline-info"
            className="ms-2"
            onSelect={(val) => setStatusFilter(val === "all" ? null : val)}
          >
            <Dropdown.Item eventKey="all">All</Dropdown.Item>
            <Dropdown.Item eventKey="active">Active</Dropdown.Item>
            <Dropdown.Item eventKey="inactive">Inactive</Dropdown.Item>
          </DropdownButton>
          <DropdownButton
            id="role-dropdown"
            title={
              roleFilter
                ? roleFilter.charAt(0).toUpperCase() + roleFilter.slice(1)
                : "Role"
            }
            variant="outline-info"
            className="ms-2"
            onSelect={(val) =>
              setRoleFilter(val === "all" ? null : (val as UserRole))
            }
          >
            <Dropdown.Item eventKey="all">All</Dropdown.Item>
            <Dropdown.Item eventKey="admin">Admin</Dropdown.Item>
            <Dropdown.Item eventKey="user">User</Dropdown.Item>
            <Dropdown.Item eventKey="partner">Partner</Dropdown.Item>
          </DropdownButton>
          <DropdownButton
            id="sort-dropdown"
            title={
              sortOrder === "asc"
                ? "Sort: A-Z"
                : sortOrder === "desc"
                ? "Sort: Z-A"
                : "Sort"
            }
            variant="outline-info"
            className="ms-2"
            onSelect={(val) =>
              setSortOrder(val === "none" ? null : (val as "asc" | "desc"))
            }
          >
            <Dropdown.Item eventKey="none">None</Dropdown.Item>
            <Dropdown.Item eventKey="asc">Name Ascending (A-Z)</Dropdown.Item>
            <Dropdown.Item eventKey="desc">Name Descending (Z-A)</Dropdown.Item>
          </DropdownButton>
        </div>
        {/* Company-standard dark themed user list */}
        <div
          className="table-responsive"
          style={{ borderRadius: 18, overflow: "hidden" }}
        >
          <table
            className="table table-dark table-hover align-middle mb-0"
            style={{ background: "#232b3b" }}
          >
            <thead>
              <tr style={{ background: "#202945" }}>
                <th
                  style={{
                    color: "#0dcaf0",
                    fontWeight: 700,
                    letterSpacing: 1,
                  }}
                >
                  #
                </th>
                <th
                  style={{
                    color: "#0dcaf0",
                    fontWeight: 700,
                    letterSpacing: 1,
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    color: "#0dcaf0",
                    fontWeight: 700,
                    letterSpacing: 1,
                  }}
                >
                  Email
                </th>
                <th
                  style={{
                    color: "#0dcaf0",
                    fontWeight: 700,
                    letterSpacing: 1,
                  }}
                >
                  Role
                </th>
                <th
                  style={{
                    color: "#0dcaf0",
                    fontWeight: 700,
                    letterSpacing: 1,
                  }}
                >
                  Status
                </th>
                <th
                  style={{
                    color: "#0dcaf0",
                    fontWeight: 700,
                    letterSpacing: 1,
                  }}
                >
                  Contact
                </th>
                <th
                  style={{
                    color: "#0dcaf0",
                    fontWeight: 700,
                    letterSpacing: 1,
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {pagedData.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-5">
                    No users found.
                  </td>
                </tr>
              )}
              {pagedData.map((u, idx) => {
                const initials = `${u.firstName?.[0] ?? ""}${
                  u.lastName?.[0] ?? ""
                }`.toUpperCase();
                return (
                  <tr key={u.id} style={{ borderBottom: "1px solid #28304a" }}>
                    <td>
                      <div
                        className="rounded-circle d-inline-flex align-items-center justify-content-center"
                        style={{
                          width: 40,
                          height: 40,
                          background:
                            "linear-gradient(135deg, #0dcaf0 60%, #0a58ca 100%)",
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: 18,
                          letterSpacing: 1,
                          boxShadow: "0 2px 8px #0dcaf033",
                        }}
                      >
                        {initials}
                      </div>
                    </td>
                    <td style={{ color: "#f3f6fa", fontWeight: 600 }}>
                      {u.firstName} {u.lastName}
                    </td>
                    <td style={{ color: "#b6bedc" }}>{u.email}</td>
                    <td>
                      <span
                        className={`badge me-1 bg-${
                          u.role === "admin"
                            ? "primary"
                            : u.role === "user"
                            ? "info"
                            : "secondary"
                        }`}
                        style={{
                          color: u.role === "user" ? "#181c24" : "#fff",
                          background:
                            u.role === "admin"
                              ? "#0dcaf0"
                              : u.role === "user"
                              ? "#31d2f2"
                              : "#6c757d",
                          fontWeight: 600,
                          fontSize: "1em",
                        }}
                      >
                        {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          u.status === "active" ? "bg-success" : "bg-secondary"
                        }`}
                        style={{
                          color: "#fff",
                          background:
                            u.status === "active" ? "#198754" : "#6c757d",
                          fontWeight: 600,
                          fontSize: "1em",
                        }}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td style={{ color: "#b6bedc" }}>{u.contactNo}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          size="sm"
                          variant="info"
                          onClick={() => handleView(u.id)}
                          className="text-dark"
                        >
                          View
                        </Button>
                        {canEdit && (
                          <Button
                            size="sm"
                            variant="warning"
                            onClick={() => handleEdit(u)}
                            className="text-dark"
                          >
                            Edit
                          </Button>
                        )}
                        {canDelete && (
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleDelete(u.id)}
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Pagination controls */}
        <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-2">
          <div>
            <span className="me-2">
              Page{" "}
              <strong>
                {pageCount === 0 ? 0 : pageIndex + 1} of {pageCount}
              </strong>
            </span>
            <span className="ms-2">
              Showing{" "}
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPageIndex(0);
                }}
                className="form-select form-select-sm d-inline-block w-auto"
                style={{ minWidth: 60, display: "inline-block" }}
              >
                {[8, 12, 16, 20, 24, 32, 40, 50].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>{" "}
              entries
            </span>
          </div>
          <Pagination className="mb-0">
            <Pagination.First
              onClick={() => setPageIndex(0)}
              disabled={pageIndex === 0}
            />
            <Pagination.Prev
              onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
              disabled={pageIndex === 0}
            />
            <Pagination.Next
              onClick={() =>
                setPageIndex((p) => Math.min(pageCount - 1, p + 1))
              }
              disabled={pageIndex >= pageCount - 1 || pageCount === 0}
            />
            <Pagination.Last
              onClick={() => setPageIndex(pageCount - 1)}
              disabled={pageIndex >= pageCount - 1 || pageCount === 0}
            />
          </Pagination>
        </div>
      </div>
      <ConfirmDeleteModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        onConfirm={confirmDelete}
        userName={
          userToDelete
            ? `${userToDelete.firstName} ${userToDelete.lastName}`
            : ""
        }
      />
      <DeleteSuccessModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
      />
    </div>
  );
};

export default UserList;
