import { ChangeEvent, useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import { User } from "../userlist/UserList";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import Menu from "../../../menu/Menu";
import '../../../styles/master.css'

export default function UserChange() {

    const baseurl = "http://localhost:5000/api";

    const [user, setUser] = useState<User>({} as User);

    const navigate = useNavigate();

    const params = useParams();
    const pid = params["id"];

    useEffect(() => {
        const GetById = async (id: any) => {
            //console.debug(`${baseurl}/users/${id}`)
            axios.get(`${baseurl}/users/${id}`)
                .then((res): void => {
                        console.debug("Read User:", res.data);
                        setUser(res.data);
                        console.debug("user:", user, ", Id ", user.id, ", Admin ", user.isAdmin);
                    })
        };
            
        if(typeof pid === "string")
            GetById(pid);
    }, []);

    const updateUser = () => {
        axios.put(`${baseurl}/users/${user.id}`, user)
            .then((res) => {
                console.log("Success!", res);
                navigate("/user/list");
            })
            .catch((err) => {
                console.error("ERROR!", err);
            });
    }

    const onSubmit = () => {
        console.debug(user);
        updateUser();
    }

    const onChangeId = (event: any) => user.id = event.target.value;
    const onChangeUsername = (event: any) => user.username = event.target.value;
    const onChangePassword = (event: any) => user.password = event.target.value;
    const onChangeFirstname = (event: any) => user.firstname = event.target.value;
    const onChangeLastname = (event: any) => user.lastname = event.target.value;
    const onChangePhone = (event: any) => user.phone = event.target.value;
    const onChangeEmail = (event: any) => user.email = event.target.value;
    const onChangeReviewer = (event: ChangeEvent<HTMLInputElement>) => {
        user.isReviewer = event.target.checked;
        setUser(user);
        event.target.checked = user.isReviewer;
    }
    const onChangeAdmin = (event: ChangeEvent<HTMLInputElement>) => {
        user.isAdmin = event.target.checked;
        setUser(user);
        event.target.checked = user.isAdmin;
    }
    

    return (
        <>
        <Menu />
        <Form>
        <Table bordered className='form'>
            <tbody>
                <tr>
                    <td className='label'><label htmlFor='id'>Id</label></td>
                    <td className='data'>
                        <input id='id' name='id' type="text" 
                            defaultValue={user.id} 
                            onChange={onChangeId}/>
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor='username'>Username</label></td>
                    <td>
                        <input id='username' name='username' type="text" 
                            defaultValue={user.username} onChange={onChangeUsername} 
                            autoComplete="username"/>
                    </td>
                </tr>
                <tr hidden>
                    <td><label htmlFor='password'>Password</label></td>
                    <td>
                        <input id='password' name='password' type="password" 
                            defaultValue={user.password} onChange={onChangePassword}
                            autoComplete="current-password" />
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor='firstname'>First name</label></td>
                    <td>
                        <input id='firstname' name='firstname' type="text" 
                            defaultValue={user.firstname} onChange={onChangeFirstname} />
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor='lastname'>Last name</label></td>
                    <td>
                        <input id='lastname' name='lastname' type="text" 
                            defaultValue={user.lastname} onChange={onChangeLastname} />
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor='phone'>Phone</label></td>
                    <td>
                        <input id='phone' name='phone' type="text" 
                            defaultValue={user.phone !== null ? user.phone : ''} onChange={onChangePhone} />
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor='email'>Email</label></td>
                    <td>
                        <input id='email' name='email' type="text" 
                            defaultValue={user.email !== null ? user.email : ''} onChange={onChangeEmail} />
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor='isReviewer'>Reviewer</label></td>
                    <td>
                        <input id='isReviewer' name='isReviewer' type="checkbox" 
                            defaultChecked={user.isReviewer} onChange={onChangeReviewer} />
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor='isAdmin'>Admin</label></td>
                    <td>
                        <input id="admin" name="admin" type="checkbox"
                            defaultChecked={user.isAdmin} onChange={onChangeAdmin} />
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