import React from "react";
import { Navbar, Container, Button, Modal, Form, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/appstyle.css"
import Icon from "../assets/image/icon_corona.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import addArticle from "../assets/image/addArticle.png";
import Logout from "../assets/image/logout.png";
import ImageNav from "../assets/image/ImgNav.png";
import Profile from "../assets/image/navuser.png";
import Consultation from "../assets/image/emailnav.png";

const NavigationBar = () => {
    let navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const [state, dispatch] = useContext(UserContext)
    const [formLogin, setFormLogin] = useState({
        email: '',
        password: ''
    })

    const handleChangeLog = (e) => {
        setFormLogin({
            ...formLogin,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmitLog = useMutation(async (e) => {
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };

            const body = JSON.stringify(formLogin);

            const response = await API.post('/Login', body, config);

            console.log(response)

            if (response.data.code === 200) {
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: response.data.data,
                });
            }
            window.location.reload();
        } catch (error) {
            alert("Login Failed")
            console.log(error)
        }
    })


    //register modal
    const [testForm, setForm] = useState({
        fullname: '',
        email: '',
        password: '',
        gender: '',
        phone: '',
        address: '',
    });

    const handleChange = (e) => {
        setForm({ ...testForm, [e.target.name]: e.target.value });
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };

            const body = JSON.stringify(testForm);

            if (testForm.fullname === "" || testForm.email === "" || testForm.password === "" || testForm.phone === "" || testForm.address === "") {
                alert("Please fill all the form")
            }

            const response = await API.post('/register', body, config);
            // Notification
            if (response.data.code === 200) {
                alert("Success")
                navigate("/")
                setShow(false)
                setShow2(true)

                // kosongkan form
                testForm({
                    fullname: '',
                    email: '',
                    password: '',
                    gender: '',
                    phone: '',
                    address: '',
                })
            }
        } catch (error) {
            console.log(error);
        }
    });

    const handleLogout = () => {
        dispatch({
            type: 'LOGOUT',
        });
        window.location.reload();
    };



    return (
        <Navbar className="test">
            <Container>
                <Navbar.Brand >
                    <img src={Icon} alt="Icon" className="img1" onClick={
                        () => navigate('/')
                    } />
                </Navbar.Brand>
                <Navbar.Collapse className="nav justify-content-end" style={{
                    paddingTop: '18px'
                }}>

                    {state.isLogin === true ? <>
                        {state.user.role === "admin" ?
                            <>
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-basic" style={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                    }}>
                                        <img src={ImageNav} alt="" style={{
                                            width: '60px',
                                            height: '60px',
                                        }} />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item
                                            onClick={() => navigate('/profileDr')}
                                        ><img src={Profile} alt="" style={{
                                            margin: '10px'
                                        }}></img>Profile</Dropdown.Item>
                                        <Dropdown.Item onClick={() => navigate('/formArticle')}><img src={addArticle} alt="" style={{
                                            margin: '10px'
                                        }}></img>Add Article</Dropdown.Item>

                                        <Dropdown.Item onClick={handleLogout}><img src={Logout} alt="" style={{
                                            margin: '10px'
                                        }}></img>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </>
                            :
                            <>
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-basic" style={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                    }}>
                                        <img src={ImageNav} alt="" style={{
                                            width: '60px',
                                            height: '60px',
                                        }} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => navigate(`/profile/${state?.user.id}`)}><img src={Profile} alt="" style={{
                                            margin: '10px'
                                        }}></img>Profile</Dropdown.Item>
                                        <Dropdown.Item onClick={() => navigate(`/inbox/${state?.user.id}`)}><img src={Consultation} alt="" style={{
                                            margin: '10px'
                                        }}></img>Consultation</Dropdown.Item>

                                        <Dropdown.Item onClick={handleLogout}><img src={Logout} alt="" style={{
                                            margin: '10px'
                                        }}></img>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </>
                        }
                    </> : <>
                        <Button className="Button1" variant="outline-light" onClick={handleShow2} >Sign In</Button>
                        <Modal show={show2} onHide={handleClose2}>
                            <Modal.Title style={{
                                textAlign: 'center',
                                fontFamily: 'Product Sans',
                                fontWeight: '700',
                                fontSize: '36px',
                                padding: '20px'
                            }}>Sign In</Modal.Title>

                            <Modal.Body>
                                <Form  >
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            name="email"
                                            type="email"
                                            onChange={(e) => handleChangeLog(e)}
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="exampleForm.ControlTextarea1"
                                    >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            name='password'
                                            type='password' rows={3}
                                            onChange={(e) => handleChangeLog(e)}
                                        />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Button style={{
                                width: '80%',
                                margin: 'auto',
                                marginBottom: '20px',
                                backgroundColor: '#FF6185',
                            }} onClick={(e) => handleSubmitLog.mutate(e)}>
                                Sign in
                            </Button>
                            <h1 style={{
                                textAlign: 'center',
                                fontFamily: 'avenir',
                                fontWeight: '400',
                                fontSize: '18px',
                                color: '#B1B1B1',
                                padding: '0px 0px 0px 0px'
                            }}>Don't have an account? <u style={{
                                cursor: 'pointer'
                            }} onClick={handleShow}> Click Here</u></h1>
                        </Modal>

                        {/* Button Register */}
                        <Button className="Button2" onClick={handleShow}>Sign Up</Button>
                        <Modal show={show} onHide={handleClose}>

                            <Modal.Title style={{
                                textAlign: 'center',
                                fontFamily: 'Product Sans',
                                fontWeight: '700',
                                fontSize: '36px',
                                padding: '20px'
                            }}>Sign Up</Modal.Title>

                            <Modal.Body>
                                <Form >
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Fullname</Form.Label>
                                        <Form.Control
                                            name="fullname"
                                            type="text"
                                            onChange={(e) => handleChange(e)}

                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            name="email"
                                            type="email"
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="exampleForm.ControlTextarea1"
                                    >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control

                                            name="password"
                                            type='password' rows={3}
                                            required
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control
                                            name='phone'
                                            type="number"
                                            autoFocus
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Select aria-label="Default select example" name='gender' onChange={(e) => handleChange(e)}>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control
                                            name='address'
                                            as="textarea" rows={3}
                                            onChange={(e) => handleChange(e)}
                                        />

                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Button style={{
                                width: '80%',
                                margin: 'auto',
                                marginBottom: '20px',
                                backgroundColor: '#FF6185',
                            }} onClick={(e) => handleSubmit.mutate(e)}>
                                Register
                            </Button>
                        </Modal>
                    </>}

                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default NavigationBar