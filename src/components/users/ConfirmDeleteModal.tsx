import { Modal, Button } from "react-bootstrap";

interface ConfirmDeleteModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  userName?: string;
}

const ConfirmDeleteModal = ({
  show,
  onHide,
  onConfirm,
  userName,
}: ConfirmDeleteModalProps) => (
  <Modal show={show} onHide={onHide} centered animation backdrop="static">
    <Modal.Body className="text-center py-4">
      <div className="mb-3">
        <span style={{ fontSize: 48, color: "#dc3545" }}>&#9888;</span>
      </div>
      <h5 className="mb-3">
        Are you sure you want to delete{userName ? ` ${userName}` : ""}?
      </h5>
      <p className="text-muted mb-4">This action cannot be undone.</p>
      <div className="d-flex justify-content-center gap-3">
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} autoFocus>
          Yes, Delete
        </Button>
      </div>
    </Modal.Body>
  </Modal>
);

export default ConfirmDeleteModal;
