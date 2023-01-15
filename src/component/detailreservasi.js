import React from "react";
import { Table, Modal, Row, Col, Button, Form } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState } from "react";
import moment from 'moment'
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";


const ModalReservation = ({ show, setShow, value, reservasiId }) => {

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
        status: '',
        reply: '',
    })

    const handleChangeApprove = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    //func submit for update 

    const handlesubmitApprove = async () => {
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
            formData.append('gender', form.gender)
            formData.append('subject', form.subject);
            formData.append('dateconsul', form.dateconsul);
            formData.append('description', form.description);
            formData.append('status', 'Waiting Live Consultation');
            formData.append('reply', form.reply);

            const response = await API.patch(`/consultations/${reservasiId}`, formData, config);

            alert('Anda Telah Menyetujui Konsultasi Pasien');
            setShow(false);
            navigate(`/`)

        } catch (error) {
            console.log(error);
        }
    }

    const HandleSubmitReject = async () => {
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
            formData.append('gender', form.gender)
            formData.append('subject', form.subject);
            formData.append('dateconsul', form.dateconsul);
            formData.append('description', form.description);
            formData.append('status', 'Cancel');
            formData.append('reply', form.reply);

            const response = await API.patch(`/consultations/${reservasiId}`, formData, config);

            alert('Anda Telah Menolak Konsultasi Pasien');
            setShow(false);
            navigate(`/`)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                aria-labelledby="example-custom-modal-styling-title"
                size="xl"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Detail Konsultasi
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{
                        width: '90%'
                    }}>
                        <Row style={{
                            marginTop: '40px',
                        }}>
                            <Col xs={9} style={{
                                marginLeft: '30px',
                            }}>
                                <h5 style={{
                                    fontFamily: 'Product Sans',
                                    fontWeight: '900px',
                                    fontSize: '24px',

                                }}>
                                    {value?.subject}
                                </h5>
                                <p>
                                    Keluhan: {value?.description}
                                </p>
                            </Col>
                            <Col xs={2}>
                                <div className="rsv-date ms-3">
                                    <h5>Date of Complaint</h5>
                                    <p className="text-muted">
                                        {moment(value?.createdAt).format("DD MMMM YYYY")}
                                    </p>
                                    <h5>Live Consultation</h5>
                                    <p className="text-muted">
                                        {moment(value?.dateconsul).format("DD MMMM YYYY")}
                                    </p>
                                </div>
                            </Col>
                        </Row>
                        <Table style={{
                            marginLeft: '20px'
                        }}>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Fullname</th>
                                    <th>Gender</th>
                                    <th>Phone</th>
                                    <th>Age</th>
                                    <th>Height</th>
                                    <th>Weight</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>{value?.fullname}</td>
                                    <td>{value?.gender}</td>
                                    <td>{value?.phone}</td>
                                    <td>{value?.age}</td>
                                    <td>{value?.height}</td>
                                    <td>{value?.weight}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <Form style={{
                            marginLeft: '30px',
                            width: '100%'
                        }}>
                            <Form.Group className="form-group">
                                <Form.Label>Reply</Form.Label>
                                <FloatingLabel controlId="floatingTextarea2">
                                    <Form.Control as="textarea" className="form-input" style={{ width: '100%', height: '300px', backgroundColor: '#B1B1B1' }} name="reply" onChange={handleChangeApprove} />
                                </FloatingLabel>
                            </Form.Group>
                        </Form>
                        {value?.status === 'Waiting Approve Consultation' ?
                            <>
                                <Modal.Footer>
                                    <Button variant="secondary" style={{
                                        backgroundColor: '#FF0742',
                                    }} onClick={HandleSubmitReject}>Cancel</Button>
                                    <Button variant="primary" style={{
                                        backgroundColor: '#0ACF83',
                                    }} onClick={handlesubmitApprove}>Approve</Button>
                                </Modal.Footer>
                            </>
                            :
                            <>
                            </>
                        }
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalReservation

