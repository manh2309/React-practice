import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { fechtEditUser } from '../services/UsersService';
import { toast } from "react-toastify";
import { useEffect } from 'react';
const ModalEdit = (props) => {
    const { show, handleClose, dataUserEdit, handleEditFromUser } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    const handleEditUser = async () => {
        let id = dataUserEdit.id;
        let res = await fechtEditUser(id, name, job);
        if (res && res.updatedAt) {
            console.log(res);
            handleEditFromUser({
                first_name: name,
                id: dataUserEdit.id
            })
            handleClose();
            toast.success("Edit Sucsess!")
        }
    }

    useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name);
        }
    }, [dataUserEdit])
    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit a User: </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
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