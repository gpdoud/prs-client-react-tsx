import axios from "axios";
import { useEffect, useState } from "react";
import './UserList.css';
import { Table } from "react-bootstrap";
import Menu from "../../../menu/Menu";
import Header from "../../header/Header";
import { IUser } from "../iuser/IUser";

const baseurl = "http://localhost:5000/api";

export default function UserList() {

    const [users, setUsers ] = useState([] as IUser[]);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${baseurl}/users`)
                .then((res) => {
                    console.debug(res.data as IUser[]);
                    setUsers(res.data);
                });
        }
        fetchData();
    }, []);

    return (
        <>
        <Menu />
        <Header pageTitle="User List" />
        <a href='/user/create'>Create New</a>
        <Table striped bordered hover>
            <thead>
                <tr>
                <td>Id:</td>
                <td>Username:</td>
                <td>Firstname:</td>
                <td>Lastname:</td>
                <td>Phone</td>
                <td>Email:</td>
                <td>Reviewer</td>
                <td>Admin:</td>
                <td>Actions</td>
                </tr>
            </thead>
            <tbody>
                { users.map((u) => 
                    <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.username}</td>
                        <td>{u.firstname}</td>
                        <td>{u.lastname}</td>
                        <td>{u.phone ?? "N"}</td>
                        <td>{u.email ?? "N"}</td>
                        <td>{u.isReviewer ? "Y": "N"}</td>
                        <td>{u.isAdmin ? "Y": "N"}</td>
                        <td>
                            <a href={`/users/detail/${u.id}`}>Detail</a> |
                            <a href={`/users/change/${u.id}`}>Change</a>
                        </td>
                    </tr> 
                )}
            </tbody>
        </Table>
        </>
    );
}