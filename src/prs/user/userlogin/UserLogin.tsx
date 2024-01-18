import { ChangeEvent, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import './UserLogin.css';
import axios from "axios";
import { useNavigate } from "react-router";
import sha256 from 'sha256';

export default function UserLogin() {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const navigate = useNavigate();
    
    const login = (url: string) => {
        console.log(url);
        axios.get(`${url}`)
        .then((res): void => {
            console.debug("Read User:", res.data);
            navigate("/user/list");
        })
        .catch((err) => { 
            console.error(err);
            setMessage("Username/Password was not found!");
        });
    }
    
    const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    const onSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        const encryptedPassword = sha256(password);
        setPassword('');
        const url = `http://localhost:5000/api/users/${username}/${encryptedPassword}`;
        login(url);
    }
    return (
        <Form className="login" onSubmit={onSubmit}>
        <Container className='login'>
            <Row>
                <Col className='title' aria-colspan={2}>Login</Col>
            </Row>
            <Row>
                <Col md={4}>Username:</Col>
                <Col md={6}>
                    <input name='username' 
                            type='text' 
                            value={username}
                            autoComplete="username"
                            onChange={onChangeUsername}
                            />
                </Col>
            </Row>
            <Row>
                <Col md={4}>Password:</Col>
                <Col md={6}>
                    <input name='password' 
                            type='password' 
                            value={password}
                            autoComplete="current-password"
                            onChange={onChangePassword}
                            />
                </Col>
            </Row>
            <Row>
                <Col aria-colspan={2} className='center'>
                    <Button type='submit' 
                            variant='primary' 
                            // onClick={onSubmit} 
                            >
                            Login
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col aria-colspan={2} className='center alert'>
                    {message}
                </Col>
            </Row>
        </Container>
        </Form>
    )
}