import { useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import Menu from "../../../menu/Menu";
import axios from "axios";
import '../../../styles/master.css';
import { useNavigate } from "react-router-dom";

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

    const navigate = useNavigate();

    const [adminChk, setAdminChk] = useState<boolean>(false);
    const [reviewerChk, setReviewerChk] = useState<boolean>(false);  

    const createUser = () => {
        axios.post(`${baseurl}`, user)
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
        createUser();
    }

    const onChangeId = (event: any) => user.id = event.target.value;
    const onChangeUsername = (event: any) => user.username = event.target.value;
    const onChangePassword = (event: any) => user.password = event.target.value;
    const onChangeFirstname = (event: any) => user.firstname = event.target.value;
    const onChangeLastname = (event: any) => user.lastname = event.target.value;
    const onChangePhone = (event: any) => user.phone = event.target.value;
    const onChangeEmail = (event: any) => user.email = event.target.value;
    const onChangeReviewer = (event: any) => {
        user.isReviewer = event.target.checked;
        setReviewerChk(user.isReviewer);
    }
    const onChangeAdmin = (event: any) => {
        user.isAdmin = event.target.checked;
        setAdminChk(user.isAdmin);
    }
    return (
        <>
        <Menu />
        <Form className="form">
        <Container>
          <Row>
            <Col md={3}>Id</Col>
            <Col md={6}>
              <input type='text' value={user.id} onChange={onChangeId} />
            </Col>
          </Row>
          <Row>
            <Col md={3}>Username</Col>
            <Col md={6}>
              <input
                defaultValue={user.username}
                onChange={onChangeUsername}
                autoComplete="username"
              />
            </Col>
          </Row>
          <Row hidden>
            <Col md={3}>Password</Col>
            <Col md={6}>
              <input
                defaultValue={user.password}
                type="password"
                onChange={onChangePassword}
                autoComplete="current-password"
              />
            </Col>
          </Row>
          <Row>
            <Col md={3}>First name</Col>
            <Col md={6}>
              <input
                defaultValue={user.firstname}
                onChange={onChangeFirstname}
              />
            </Col>
          </Row>
          <Row>
            <Col md={3}>Last name</Col>
            <Col md={6}>
              <input defaultValue={user.lastname} onChange={onChangeLastname} />
            </Col>
          </Row>
          <Row>
            <Col md={3}>Phone</Col>
            <Col md={6}>
              <input
                defaultValue={user.phone !== null ? user.phone : ""}
                onChange={onChangePhone}
              />
            </Col>
          </Row>
          <Row>
            <Col md={3}>Email</Col>
            <Col md={6}>
              <input
                defaultValue={user.email !== null ? user.email : ""}
                onChange={onChangeEmail}
              />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <label htmlFor="reviewer">Reviewer?</label>
            </Col>
            <Col md={6}>
              <input
                id="reviewer"
                checked={reviewerChk}
                type="checkbox"
                onChange={onChangeReviewer}
              />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <label htmlFor="admin">Admin?</label>
            </Col>
            <Col md={6}>
              <input
                id="admin"
                checked={adminChk}
                type="checkbox"
                onChange={onChangeAdmin}
              />
            </Col>
          </Row>
        </Container>
        <div style={{ margin: "10px 0" }}>
          <div className="left">
            <Button onClick={onSubmit} variant="primary">
              Save
            </Button>
          </div>
        </div>
      </Form>
       </>
    );
}