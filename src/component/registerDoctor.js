import React from "react";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const RegisterDoctor = () => {
    let navigate = useNavigate();
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

            const response = await API.post('/registerdoctor', body, config);
            // Notification
            if (response.data.code === 200) {
                alert("Success")
                navigate("/")


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
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Form style={{
                width: '500px',
                marginTop: '50px',
            }}>
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
                <Button style={{
                    width: '40%',
                    marginBottom: '20px',
                    backgroundColor: '#FF6185',
                    justifyContent : 'center',
                }} onClick={(e) => handleSubmit.mutate(e)}>
                    Register
                </Button>
            </Form>
        </div>
    )
}

export default RegisterDoctor;