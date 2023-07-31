import Table from 'react-bootstrap/Table';
import { useEffect } from 'react';
import axios from 'axios';
import { fecthAllUser } from '../services/UsersService';
import ModalAddNew from "./ModalAddNewUsers";
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

const TableUsers = (prop) => {
    const [listUser, setListUser] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    const handleClose = () => {
        setIsShowModalAddNew(false)
    }

    const handleUpdateTable = (user) => {
        setListUser([user, ...listUser]);
    }
    useEffect(() => {
        //call apis
        getUsers(1);
    }, [])

    const getUsers = async (page) => {
        let res = await fecthAllUser(page);
        if (res && res.data) {
            setTotalUsers(res.total);
            setTotalPages(res.total_pages);
            setListUser(res.data);
        }
    }
    console.log("check", listUser)
    const handlePageClick = (event) => {
        getUsers(+event.selected + 1)
        console.log(event)
    }
    return (<>
        <div className="my-3 add-new">
            <span><b>List User:</b></span>
            <button className="btn btn-success"
                onClick={() => setIsShowModalAddNew(true)}
            >Add new user</button>
        </div>

        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
            </thead>
            <tbody>
                {listUser && listUser.length > 0 &&
                    listUser.map((item, index) => {
                        return (
                            <>
                                <tr key={`users-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                </tr>
                            </>
                        )
                    })
                }

            </tbody>
        </Table>
        <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="< previous"
            renderOnZeroPageCount={null}

            pageClassName='page-item'
            pageLinkClassName='page-link'
            previousClassName='page-item'
            previousLinkClassName='page-link'
            nextClassName='page-item'
            nextLinkClassName='page-link'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            containerClassName='pagination'
            activeClassName='active'
        />
        <ModalAddNew
            show={isShowModalAddNew}
            handleClose={handleClose}
            handleUpdateTable={handleUpdateTable}
        />
    </>)
}
export default TableUsers 
