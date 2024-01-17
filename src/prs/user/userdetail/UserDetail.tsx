import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../userlist/UserList";
import '../../../styles/master.css';
import Menu from "../../../menu/Menu";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";

const baseurl = "http://localhost:5000/api";

export default function UserDetail() {
  const [user, setUser] = useState<User>({} as User);

  const navigate = useNavigate();

  const params = useParams();
  const pid = params["id"];

  useEffect(() => {
    const GetById = async (id: any) => {
      console.debug(`${baseurl}/users/${id}`);
      axios.get(`${baseurl}/users/${id}`).then((res): void => {
        console.debug("User:", res.data);
        setUser(res.data as User);
      });
    };

    if (typeof pid === "string") GetById(pid);
  }, []);

  const handleDelete = () => {
    axios.delete(`${baseurl}/users/${user.id}`)
      .then((res): void => {
        console.debug("User Deleted", res.data);
        navigate("/user/list")
      })
      .catch((err) => {
        console.error(err);
      })
    };
  
  return (
    <>
      <Menu />
      <Form className='form'>
        <Container>
          <Row>
            <Col md={3}>Id</Col>
            <Col md={6}><input value={user.id} /></Col>
          </Row>
          <Row>
            <Col md={3}>Username</Col>
            <Col md={6}><input value={user.username} /></Col>
          </Row>
          <Row hidden>
            <Col md={3}>Password</Col>
            <Col md={6}><input value={user.password} type='password' /></Col>
          </Row>
          <Row>
            <Col md={3}>First name</Col>
            <Col md={6}><input value={user.firstname} /></Col>
          </Row>
          <Row>
            <Col md={3}>Last name</Col>
            <Col md={6}><input value={user.lastname} /></Col>
          </Row>
          <Row>
            <Col md={3}>Phone</Col>
            <Col md={6}><input value={user.phone !== null ? user.phone : ''} /></Col>
          </Row>
          <Row>
            <Col md={3}>Email</Col>
            <Col md={6}><input value={user.email !== null ? user.email : ''} /></Col>
          </Row>
          <Row>
            <Col md={3}>Reviewer?</Col>
            <Col md={6}><input checked={user.isReviewer} type='checkbox' /></Col>
          </Row>
          <Row>
            <Col md={3}>Admin?</Col>
            <Col md={6}><input checked={user.isAdmin} type='checkbox' /></Col>
          </Row>
        </Container>
        
      <div>
        <div className='left'>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
        <div className='right' style={{  textAlign: 'right' }}>
          <Button variant="danger" onClick={handleDelete}>Verify</Button>
        </div>
      </div>
      </Form>
    </>
  );
}
