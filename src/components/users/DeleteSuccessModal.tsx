import { Modal, Button } from "react-bootstrap";

interface DeleteSuccessModalProps {
  show: boolean;
  onHide: () => void;
}

const DeleteSuccessModal = ({ show, onHide }: DeleteSuccessModalProps) => (
  <Modal
    show={show}
    onHide={onHide}
    centered
    animation
    backdrop="static"
    className="fade-scale-modal"
  >
    <Modal.Body className="text-center py-5">
      <div className="mb-3">
        <span style={{ fontSize: 48, color: "#28a745" }}>&#10004;</span>
      </div>
      <h4 className="mb-3">User Deleted!</h4>
      <p className="text-muted mb-4">
        The user profile has been successfully deleted.
      </p>
      <Button variant="success" onClick={onHide} autoFocus>
        OK
      </Button>
    </Modal.Body>
  </Modal>
);

export default DeleteSuccessModal;
