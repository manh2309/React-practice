import Table from 'react-bootstrap/Table';
import { useEffect } from 'react';
import axios from 'axios';
import { fecthAllUser, fecthSearchUser } from '../services/UsersService';
import ModalAddNew from "./ModalAddNewUsers";
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import ModalEdit from './ModalEditUsers';
import ModalConFirm from './ModalConfirm';
import _, { debounce, filter, includes, set } from "lodash";
import { CSVLink, CSVDownload } from 'react-csv';
import './TableUsers.scss';

const TableUsers = (props) => {
    const [listUser, setListUser] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [page, setTotalPages] = useState(0);
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataUserDel, setDataUserDel] = useState({});

    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id");

    const [dataExport, setDataExport] = useState([]);

    const handleClose = () => {
        setIsShowModalAddNew(false)
        setIsShowModalEdit(false)
        setIsShowModalDelete(false)
    }

    const handleUpdateTable = (user) => {
        // setListUser([user, ...listUser]);
        // setListUser()
        getUsers(0, 5);
    }
    const handleEditUser = (user) => {
        setIsShowModalEdit(true);
        setDataUserEdit(user);

    }
    const handleEditFromUser = () => {
        // let cloneListUser = _.cloneDeep(listUser);
        // let index = listUser.findIndex(item => item.id === user.id);
        // cloneListUser[index].first_name = user.first_name;
        getUsers(0, 5);
    }
    const handleDeleteUser = (user) => {
        // let cloneListUser = _.cloneDeep(listUser);
        // let fill = listUser.filter(item => item.id === user.id);
        setIsShowModalDelete(true);
        setDataUserDel(user);
    }
    const handleConfirmDelUser = () => {
        // let cloneListUser = _.cloneDeep(listUser);
        // cloneListUser = cloneListUser.filter(item => item.id !== user.id);
        // setListUser(cloneListUser);
        getUsers(0, 5);
    }
    useEffect(() => {
        //call apis
        getUsers(0, 5);
        console.log(listUser);
    }, [])

    const getUsers = async (page, size) => {
        let res = await fecthAllUser(page, size);
        console.log(res);
        if (res && res.content) {
            setTotalUsers(res.total);
            console.log("check", res);
            setTotalPages(res.totalPages);
            setListUser(res.content);
        }
    }
    const handlePageClick = (event) => {
        getUsers(+event.selected, 5)
        console.log(event)
    }

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let cloneListUser = _.cloneDeep(listUser);
        cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
        setListUser(cloneListUser);
    }

    const handleSearch = debounce(async (event) => {
        let query = event.target.value;
        if (query) {
            // let cloneListUser = _.cloneDeep(listUser);
            // cloneListUser = cloneListUser.filter(item => item.email.includes(term));
            let res = await fecthSearchUser(query);
            // setListUser(cloneListUser);
            setListUser(res);
            console.log(res);
        } else {
            getUsers(0, 5);
        }
    }, 500)

    const getUsersExport = (event, done) => {
        let result = [];
        if (listUser && listUser.length > 0) {
            result.push("Id", "Email", "First Name", "Last Name", "Job");
            listUser.map(item => {
                let arr = [];
                arr[0] = item.id;
                arr[1] = item.email;
                arr[2] = item.first_name;
                arr[3] = item.last_name;
                arr[4] = item.job;
                result.push();
            })
            setDataExport(result);
            done();
        }

    }

    return (<>
        <div className="my-3 add-new">
            <span><b>List User:</b></span>
            <div className='group-btn'>
                <label className='btn btn-warning' htmlFor='import'>
                    <i class="fa-solid fa-file-import"></i> Import</label>
                <input id="import" type='file' hidden />
                <CSVLink
                    data={listUser}
                    filename={"users.csv"}
                    className="btn btn-primary"
                    asyncOnClick={true}
                    onClick={getUsersExport}
                ><i className="fa-solid fa-file-arrow-down"></i> Export</CSVLink>

                {/* <CSVDownload data={csvData} target='_blank' /> */}
                <button className="btn btn-success"
                    onClick={() => setIsShowModalAddNew(true)}
                >
                    <i className="fa-solid fa-circle-plus"></i> Add new</button>
            </div>
        </div>
        <div className='col-4 my-3'>
            <input className='form-control'
                placeholder='Search user by email...'
                // value={keyword}
                onChange={(event) => handleSearch(event)}
            />
        </div>

        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>
                        <div className='sort-header'>
                            <span >ID</span>
                            <span>
                                <i className="fa-solid fa-arrow-down-long"
                                    onClick={() => handleSort("desc", "id")}
                                ></i>
                                <i className="fa-solid fa-arrow-up-long"
                                    onClick={() => handleSort("asc", "id")}
                                ></i>
                            </span>
                        </div>
                    </th>
                    <th >Email</th>
                    <th >
                        <div className='sort-header'>
                            <span>First Name</span>
                            <span>
                                <i className="fa-solid fa-arrow-down-long"
                                    onClick={() => handleSort("desc", "first_name")}
                                ></i>
                                <i className="fa-solid fa-arrow-up-long"
                                    onClick={() => handleSort("asc", "first_name")}
                                ></i>
                            </span>
                        </div>
                    </th>
                    <th >Last Name</th>
                    <th>Job</th>
                    <th >Action</th>
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
                                    <td>{item.job}</td>
                                    <td>
                                        <button
                                            className='btn btn-warning mx-3'
                                            onClick={() => handleEditUser(item)}
                                        >Edit</button>
                                        <button
                                            className='btn btn-danger'
                                            onClick={() => handleDeleteUser(item)}
                                        >Delete</button>
                                    </td>
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
            pageCount={page}
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
        <ModalEdit
            show={isShowModalEdit}
            handleClose={handleClose}
            dataUserEdit={dataUserEdit}
            handleEditFromUser={handleEditFromUser}
        />
        <ModalConFirm
            show={isShowModalDelete}
            handleClose={handleClose}
            dataUserDel={dataUserDel}
            handleConfirmDelUser={handleConfirmDelUser}
        />
    </>)
}
export default TableUsers 
