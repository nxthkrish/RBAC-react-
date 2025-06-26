import { Form, Button, Card, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UserFormData } from "../../types/user";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createUser, getUser, updateUser } from "../../api/userService";

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isEditMode = !!id;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>();

  useEffect(() => {
    if (isEditMode) {
      const fetchUser = async () => {
        try {
          const user = await getUser(id);
          reset({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            contactNo: user.contactNo,
            address: user.address,
            status: user.status,
          });
        } catch (err) {
          setError("Failed to fetch user data");
        }
      };
      fetchUser();
    }
  }, [id, isEditMode, reset]);

  const onSubmit = async (data: UserFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      if (isEditMode) {
        await updateUser(id!, data);
      } else {
        await createUser({ ...data, password: "defaultPassword" });
      }

      navigate("/users");
    } catch (err) {
      setError("Failed to save user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{isEditMode ? "Edit User" : "Add User"}</Card.Title>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              {...register("firstName", { required: "First name is required" })}
              isInvalid={!!errors.firstName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.firstName?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              {...register("lastName", { required: "Last name is required" })}
              isInvalid={!!errors.lastName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.lastName?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              {...register("email", { required: "Email is required" })}
              isInvalid={!!errors.email}
              disabled={isEditMode}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select
              {...register("role", { required: "Role is required" })}
              isInvalid={!!errors.role}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.role?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              {...register("contactNo", {
                required: "Contact number is required",
              })}
              isInvalid={!!errors.contactNo}
            />
            <Form.Control.Feedback type="invalid">
              {errors.contactNo?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              {...register("address", { required: "Address is required" })}
              isInvalid={!!errors.address}
            />
            <Form.Control.Feedback type="invalid">
              {errors.address?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              {...register("status", { required: "Status is required" })}
              isInvalid={!!errors.status}
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.status?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {!isEditMode && (
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                {...register("password", { required: "Password is required" })}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>
          )}

          <div className="d-flex gap-2">
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate("/users")}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UserForm;
