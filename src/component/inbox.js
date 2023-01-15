import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from "../config/api"
import { useParams } from "react-router-dom";
import moment from 'moment'

const Inbox = () => {
    let { id } = useParams()
    let { data: cosultation1 } = useQuery('articlesCachce', async () => {
        const response = await API.get('/consultations')
        return response.data.data
    })
    return (
        <>
            <div style={{
                width: '78%',
                height: '100%',
                margin: 'auto',
            }}>
                <h1 style={{
                    width: '100%',
                    fontFamily: 'Product Sans',
                    fontWeight: '900',
                    fontSize: '36px',
                    marginLeft: '20px',
                    marginTop: '30px',
                    color: '#FF6185',
                }}>
                    Consultation
                </h1>
                <div style={{
                    width: '100%',
                    margin: '20px'
                }}>

                    {cosultation1?.map((item, index) => {
                        if (item.user.id == id) {
                            return (
                                <Card key={index} style={{ width: '100%', height: '100%', marginRight: '20px', marginBottom: '30px' }}>
                                    <Row>
                                        <Col xs={2} style={{
                                            marginLeft: '20px',
                                        }}>
                                            <Card.Img variant="top" src={item.user.image} alt="" style={{
                                                width: '120px',
                                                padding: '20px',
                                                alignItems: 'center',
                                                marginLeft: '40px',
                                                borderRadius: '50%',    
                                            }} />
                                        </Col>
                                        <Col xs={7}>
                                            <Card.Body>
                                                <div>
                                                    <div style={{
                                                        marginLeft: '17px',
                                                    }}>
                                                        <h4 style={{ fontWeight: "700" }}>{item?.subject}</h4>
                                                        <small className="text-muted">
                                                            Live Consultation:{" "}
                                                            {moment(item?.dateconsul).format("DD MMMM YYYY")}
                                                        </small>
                                                        <div className="mt-1 cons-box">Keluhan: {item?.description}</div>
                                                    </div>
                                                    <div className="ms-3 d-block">

                                                        <p style={{ color: "#ff6185", fontWeight: "700" }}>
                                                            {item?.user.fullname}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Col>
                                        <Col style={{ marginLeft: '60px', marginTop: '25px' }}>
                                            <h4 style={{ fontWeight: "bold", fontSize: "14px" }}> {moment(item?.CreatedAt).format("DD MMMM YYYY")}</h4>
                                        </Col>
                                    </Row>
                                    <hr />
                                    {item?.reply == "" ? (
                                        <Card.Footer className="text-muted">
                                            <div className="d-flex justify-content-center align-items-center p-4">
                                                <h4 style={{ fontWeight: "700" }}>Waiting For Reply</h4>
                                            </div>
                                        </Card.Footer>
                                    ) : (

                                        <Row style={{ width: '80%', height: '100%', marginLeft: '150px', marginBottom: '30px' }}>
                                            <Col xs={2}>
                                                <Card.Img variant="top" src={item.doctor.image} alt="" style={{
                                                    width: '120px',
                                                
                                                    padding: '20px',
                                                    borderRadius: '50%',
                                                }} />
                                            </Col>
                                            <Col xs={10}>
                                                <Card.Body style={{
                                                    alignSelf: 'center',
                                                }}>
                                                    <div className="inboxfoot-right mt-3">
                                                        {item?.reply}
                                                        {item?.status === "Cancel" ? <></> : <>
                                                            <a
                                                                href={`${item?.link}`}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="ms-2"
                                                            >
                                                                Here
                                                            </a></>}

                                                        <p style={{ color: "#ff6185", fontWeight: "700" }}>
                                                            Dr. {item?.doctor.fullname}
                                                        </p>
                                                    </div>
                                                </Card.Body>
                                            </Col>
                                        </Row>
                                    )}

                                </Card>
                            )
                        }
                    })}
                </div>
            </div>
        </>
    )
}

export default Inbox;