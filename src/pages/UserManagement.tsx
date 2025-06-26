import { Routes, Route } from "react-router-dom";
import UserList from "../components/users/UserList";
import UserForm from "../components/users/UserForm";
import UserView from "../components/users/UserView";
import { ProtectedRoute } from "../components/common/ProtectedRoute";

const UserManagement = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute roles={["admin", "user"]}>
            <UserList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add"
        element={
          <ProtectedRoute roles={["admin"]}>
            <UserForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <ProtectedRoute roles={["admin"]}>
            <UserForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/view/:id"
        element={
          <ProtectedRoute roles={["admin", "user", "partner"]}>
            <UserView />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default UserManagement;
