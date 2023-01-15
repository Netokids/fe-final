import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import dropdown from '../assets/image/dropdown.png';
import '../style/formaddtrip.css';
import { useState } from "react";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import { useQuery } from "react-query";

const FormConsultation = () => {
    const [state] = useContext(UserContext);
    let navigate = useNavigate();
    const [form, setForm] = useState({
        fullname: '',
        phone: '',
        borndate: '',
        age: '',
        height: '',
        weight: '',
        gender: '',
        subject: '',
        dateconsul: '',
        description: '',
        doctor_id   : ''
    })

    console.log(form);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitCons = useMutation(async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            const formData = new FormData();
            formData.append('fullname', form.fullname);
            formData.append('phone', form.phone);
            formData.append('borndate', form.borndate);
            formData.append('age', form.age);
            formData.append('height', form.height);
            formData.append('weight', form.weight);
            formData.append('gender', form.gender);
            formData.append('subject', form.subject);
            formData.append('dateconsul', form.dateconsul);
            formData.append('description', form.description);
            formData.append('doctor_id', form.doctor_id);

            const response = await API.post('/consultations', formData, config);
            alert('Konsultasi Berhasil, Harap Menunggu Balasan dari Dokter');
            navigate('/inbox/' + state.user.id)
        } catch (error) {
            console.log(error);
        }
    })
    
    let {data : dataUser} = useQuery('userCache', async () => {
        const response = await API.get('/users');
        return response.data.data;
    })
    return (
        <>
            <div className="add-trip-container">
                <h2 style={{
                    fontFamily: 'Product Sans',
                    fontWeight: '700',
                    fontSize: '48px',
                    marginLeft: '250px',
                    marginTop: '40px',
                    marginBottom: '40px',
                    color: '#FF6185'
                }}>Reservasi Konsultasi</h2>
                <Form className='form-add-trip' onSubmit={(e) => handleSubmitCons.mutate(e)}>
                    <Form.Group className="form-group" >
                        <Form.Label>Fullname</Form.Label>
                        <Form.Control className="form-input" type="text" name="fullname" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="form-group form-dropdown" controlId="formBasicPassword">
                        <Form.Label>Phone</Form.Label>
                        <img src={dropdown} alt="" className="dropdown" />
                        <Form.Control className="form-input" type="text" name="phone" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="form-group" >
                        <Row>
                            <Col xs={6}>
                                <Form.Label>Born Date</Form.Label>
                                <Form.Control className="form-input" type="date" name="borndate" onChange={handleChange} />
                            </Col>
                            <Col xs={2}>
                                <Form.Label>Age</Form.Label>
                                <Form.Control className="form-input" type="text" name="age" onChange={handleChange} />
                            </Col>
                            <Col xs={2}>
                                <Form.Label>Height</Form.Label>
                                <Form.Control className="form-input" type="text" name="height" onChange={handleChange} />
                            </Col>
                            <Col xs={2}>
                                <Form.Label>Weight</Form.Label>
                                <Form.Control className="form-input" type="text" name="weight" onChange={handleChange} />
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group className="form-group form-dropdown" controlId="formBasicPassword">
                        <Form.Label>Gender</Form.Label>
                        <img src={dropdown} alt="" className="dropdown" />
                        <Form.Select aria-label="Default select example" className="form-input" name="gender" onChange={handleChange}>
                            <option>Choose Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="form-group" >
                        <Form.Label>Subject</Form.Label>
                        <Form.Control className="form-input" type="text" name="subject" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="form-group" >
                        <Form.Label>Live Consultation Date</Form.Label>
                        <Form.Control className="form-input" type="date" name="dateconsul" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="form-group" >
                        <Form.Label>Description</Form.Label>
                        <FloatingLabel controlId="floatingTextarea2">
                            <Form.Control as="textarea" className="form-input" style={{ height: '100px' }} name="description" onChange={handleChange} />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="form-group form-dropdown" controlId="formBasicPassword">
                        <Form.Label>Dokter</Form.Label>
                        <img src={dropdown} alt="" className="dropdown" />
                        <Form.Select aria-label="Default select example" className="form-input" name="doctor_id" onChange={handleChange}>
                            <option>Choose Dokter</option>
                            {dataUser?.map((dataUser) => 
                                dataUser.role === 'doctor' ? (
                                    <option value={dataUser.id}>Dr. {dataUser.fullname}</option>
                                ) : null
                            )}

                        </Form.Select>
                    </Form.Group>

                    <Button type="submit" className='button-add-trip' style={{
                        backkgroundColor: '#FF6185',
                    }}>Send</Button>
                </Form>
            </div>
        </>
    )
}

export default FormConsultation;