import Table from 'react-bootstrap/Table';
import { useEffect } from 'react';
import axios from 'axios';
import { fecthAllUser } from '../services/UsersService';
import { useState } from 'react';
const TableUsers = (prop) => {
    const [listUser, setListUser] = useState([]);
    useEffect(() => {
        //call apis
        getUsers();
    }, [])

    const getUsers = async () => {
        let res = await fecthAllUser();
        if (res && res.data) {
            setListUser(res.data)
        }
    }
    console.log("check", listUser)
    return (<>
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
    </>)
}
export default TableUsers 
