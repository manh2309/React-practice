import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { fechtEditUser } from '../services/UsersService';
import { toast } from "react-toastify";
import { useEffect } from 'react';
const ModalEdit = (props) => {
    const { show, handleClose, dataUserEdit, handleEditFromUser } = props;
    const [last_name, setLastName] = useState("");
    const [first_name, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [job, setJob] = useState("");

    const handleEditUser = async () => {
        let id = dataUserEdit.id;
        let res = await fechtEditUser(id, first_name, last_name, email, job);
        console.log("check edit", res);
        if (res && res.create_at) {
            handleEditFromUser();
            handleClose();
            toast.success("Edit Sucsess!")
        }
    }
    useEffect(() => {
        if (show) {
            setFirstName(dataUserEdit.first_name);
            setLastName(dataUserEdit.last_name);
            setEmail(dataUserEdit.email);
            setJob(dataUserEdit.job);
        }
    }, [dataUserEdit])
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
                    <Modal.Title>Edit a User: </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <div className="mb-3">
                            <label className="form-label">First Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={first_name}
                                onChange={(event) => setFirstName(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Last Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={last_name}
                                onChange={(event) => setLastName(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Job</label>
                            <input type="text"
                                className="form-control"
                                value={job}
                                onChange={(event) => setJob(event.target.value)}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleEditUser()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default ModalEdit;