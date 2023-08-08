import { Modal, Button } from 'react-bootstrap';
import { toast } from "react-toastify";
import { fecthDelUser } from '../services/UsersService';
const ModalConFirm = (props) => {
    const { show, handleClose, dataUserDel, handleConfirmDelUser } = props;
    const confirmDelete = async () => {
        let res = await fecthDelUser(dataUserDel.id);
        if (res) {
            handleConfirmDelUser();
            handleClose();
            toast.success("Delete User succeed");
        } else {
            toast.error("Error delete User");
        }
    }

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete a User: </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <h4>This action can't be undone!</h4><br />
                        Do you want to delete this user? <br />
                        <p>email is "{dataUserDel.email}"</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => confirmDelete()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default ModalConFirm;