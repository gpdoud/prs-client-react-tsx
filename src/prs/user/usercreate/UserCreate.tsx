import { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import Menu from "../../../menu/Menu";
import axios from "axios";
import '../../../styles/master.css';

export default function UserCreate() {

    const baseurl = "http://localhost:5000/api/users";

    const [ user ] = useState({
        id: 0,
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        isReviewer: false,
        isAdmin: false
    });

    const createUser = () => {
        axios.post(`${baseurl}`, user)
            .then((res) => {
                console.log("Success!", res);
            })
            .catch((err) => {
                console.error("ERROR!", err);
            });
    }

    const onSubmit = () => {
        console.debug(user);
        createUser();
    }

    const onChangeUsername = (event: any) => user.username = event.target.value;
    const onChangePassword = (event: any) => user.password = event.target.value;
    const onChangeFirstname = (event: any) => user.firstname = event.target.value;
    const onChangeLastname = (event: any) => user.lastname = event.target.value;
    const onChangePhone = (event: any) => user.phone = event.target.value;
    const onChangeEmail = (event: any) => user.email = event.target.value;
    const onChangeReviewer = (event: any) => user.isReviewer = event.target.checked;
    const onChangeAdmin = (event: any) => user.isAdmin = event.target.checked;
    return (
        <>
        <Menu />
        <Form>
        <Table bordered className='form'>
            <tbody key='1'>
                <tr>
                    <td className='label'>Id</td>
                    <td className='data'>
                        <input name="id" defaultValue={user.id} disabled/>
                    </td>
                </tr>
                <tr>
                    <td>Username</td>
                    <td>
                        <input name="username" defaultValue={user.username} onChange={onChangeUsername} autoComplete="username"/>
                    </td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td>
                        <input name="password" type="password" defaultValue={user.password} onChange={onChangePassword} autoComplete="new-password" />
                    </td>
                </tr>
                <tr>
                    <td>Firstname</td>
                    <td>
                        <input name="firstname" defaultValue={user.firstname}  onChange={onChangeFirstname} />
                    </td>
                </tr>
                <tr>
                    <td>Lastname</td>
                    <td>
                        <input name="lastname" defaultValue={user.lastname} onChange={onChangeLastname} />
                    </td>
                </tr>
                <tr>
                    <td>Phone</td>
                    <td>
                        <input name="phone" defaultValue={user.phone} onChange={onChangePhone}  />
                    </td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>
                        <input name="email" defaultValue={user.email}  onChange={onChangeEmail} />
                    </td>
                </tr>
                <tr>
                    <td>Reviewer</td>
                    <td>
                        <input name="reviewer" type="checkbox" onChange={onChangeReviewer}   />
                    </td>
                </tr>
                <tr>
                    <td>Admin</td>
                    <td>
                        <input name="admin" type="checkbox" onChange={onChangeAdmin} />
                    </td>
                </tr>
            </tbody>
        </Table>
        <div>
            <Button onClick={onSubmit} variant='primary'>Save</Button>
        </div>
        </Form>
        </>
    );
}