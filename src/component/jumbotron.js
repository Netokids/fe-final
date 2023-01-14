import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import Icon from "../assets/image/icon_virus.png";
import Dokter_button from "../assets/image/dokter_button.png";
import Hand from "../assets/image/Hand.png";
import Eyes from "../assets/image/Eyes.png";
import Crowd from "../assets/image/Crowd.png";
import Home from "../assets/image/House.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext } from "react";


const Jumbotron = () => {
    let navigate = useNavigate()
    const [state] = useContext(UserContext);
    const handleLogin = () => {
        navigate("/")
        alert('Harap Login Telebih Dahulu')
    }
    return (
        <div style={{
            backgroundColor: '#FF6185',
            height: '398px',
            width: '100%',
        }}>
            <Row style={{
                width: '100%'
            }}>
                <Col xs={6}>
                    <div style={{
                        width: '700px',
                        height: '250px'
                    }}>
                        <Row>
                            <Col xs={1} style={{
                            }}>
                                <img src={Icon} alt="Icon" />
                            </Col>
                            <Col>
                                <div style={{
                                    marginTop: '60px',
                                }}>
                                    <h1 style={{
                                        fontFamily: 'Product Sans',
                                        fontWeight: '700',
                                        fontSize: '60px',
                                        color: '#FFFFFF',
                                        marginLeft: '100px'
                                    }}>Cegah Covid-19</h1>
                                </div>
                                <div>
                                    <h1 style={{
                                        fontFamily: 'Product Sans',
                                        fontWeight: '400',
                                        fontSize: '48px',
                                        color: '#FFFFFF',
                                        marginLeft: '100px'
                                    }}>dengan Melakukan :</h1>
                                </div>
                            </Col>
                        </Row>

                    </div>
                    <div style={{
                        width: '700px',
                        height: '140px',
                        marginLeft: '100px',
                    }}>
                        {state.isLogin === true ? <>
                            <Button style={{
                                width: '450px',
                                height: '120px',
                                backgroundColor: '#FFFFFF',
                            }} onClick={() => navigate('/konsultasi')}>
                                <img src={Dokter_button} alt="Dokter_button" style={{
                                    width: '410px',
                                }} />
                            </Button></> :
                            <><Button style={{
                                width: '450px',
                                height: '120px',
                                backgroundColor: '#FFFFFF',
                            }} onClick={handleLogin}>
                                <img src={Dokter_button} alt="Dokter_button" style={{
                                    width: '410px',
                                }} />
                            </Button></>}
                </div>
            </Col>
            <Col xs={6} style={{
                marginTop: '100px',
            }}>
                <Row>
                    <Col xs={3}>
                        <img src={Crowd} alt="Crowd" />
                    </Col>
                    <Col xs={3}>
                        <img src={Hand} alt="Hand" />
                    </Col>
                    <Col xs={3}>
                        <img src={Eyes} alt="Eyes" />
                    </Col>
                    <Col xs={3}>
                        <img src={Home} alt="Home" />
                    </Col>
                </Row>
            </Col>
        </Row>
        </div >
    )
}

export default Jumbotron