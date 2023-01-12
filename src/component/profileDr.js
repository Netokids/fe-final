import React from "react";
import { Button } from "react-bootstrap";
import Name from "../assets/image/name.png";
import Mail from "../assets/image/office.png";
import Status from "../assets/image/status.png";
import Gender from "../assets/image/gender.png";
import Phone from "../assets/image/phone.png";
import Place from "../assets/image/place.png";
import Dokter from "../assets/image/Dokter.png";

const ProfileDr = () => {
    return (
        <>
            <div style={{
                width: '785px',
                height: '453px',
                margin: 'auto',
                marginTop: '50px',
                marginBottom: '50px'
            }}>

                <div className="d-flex bg-light mb-3">
                    <div className="p-2" style={{
                        width: '60%',
                        height: 'auto',
                        margin: '30px'
                    }}>

                        <h1 style={{
                            fontFamily: 'Avenir 85 Heavy',
                            fontWeight: '900',
                            fontSize: '36px',
                            height: '24px',
                            margin: '10px'
                        }}>
                            Personal Info
                        </h1>
                        <div className="d-flex" style={{
                            marginTop: '50px'
                        }}>

                            <div className="p-2 w-40" styl>
                                <img src={Name} alt=''></img>
                            </div>
                            <div className="p-2 flex-shrink-1">
                                <h3 style={{
                                    fontFamily: 'Avenir 85 Heavy',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    height: '20px',
                                }}>name</h3>
                                <h3 style={{
                                    fontFamily: 'Avenir 85 Heavy',
                                    fontWeight: '500',
                                    fontSize: '12px',
                                    height: '16px',
                                    color: '#8A8C90'
                                }}>
                                    Fullnama
                                </h3>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="p-2 w-40">
                                <img src={Mail} alt=''></img>
                            </div>

                            <div className="p-2 flex-shrink-1">
                                <h3 style={{
                                    fontFamily: 'Avenir 85 Heavy',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    height: '20px',
                                }}>Email</h3>
                                <h3 style={{
                                    fontFamily: 'Avenir 85 Heavy',
                                    fontWeight: '500',
                                    fontSize: '12px',
                                    height: '16px',
                                    color: '#8A8C90'
                                }}>
                                    Mail
                                </h3>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="p-2 w-40">
                                <img src={Status} alt=''></img>
                            </div>

                            <div className="p-2 flex-shrink-1">
                                <h3 style={{
                                    fontFamily: 'Avenir 85 Heavy',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    height: '20px',
                                }}>Patient</h3>
                                <h3 style={{
                                    fontFamily: 'Avenir 85 Heavy',
                                    fontWeight: '500',
                                    fontSize: '12px',
                                    height: '16px',
                                    color: '#8A8C90'
                                }}>
                                    Status
                                </h3>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="p-2 w-40">
                                <img src={Gender} alt=''></img>
                            </div>

                            <div className="p-2 flex-shrink-1">
                                <h3 style={{
                                    fontFamily: 'Avenir 85 Heavy',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    height: '20px',
                                }}>Male</h3>
                                <h3 style={{
                                    fontFamily: 'Avenir 85 Heavy',
                                    fontWeight: '500',
                                    fontSize: '12px',
                                    height: '16px',
                                    color: '#8A8C90'
                                }}>
                                    Gender
                                </h3>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="p-2 w-40">
                                <img src={Phone} alt=''></img>
                            </div>
                            <div className="p-2 flex-shrink-1">
                                <h3 style={{
                                    fontFamily: 'Avenir 85 Heavy',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    height: '20px',
                                }}>Phone</h3>
                                <h3 style={{
                                    fontFamily: 'Avenir 85 Heavy',
                                    fontWeight: '500',
                                    fontSize: '12px',
                                    height: '16px',
                                    color: '#8A8C90'
                                }}>
                                    Phone
                                </h3>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="p-2 w-40">
                                <img src={Place} alt=''></img>
                            </div>
                            <div className="p-2 flex-shrink-1">
                                <h3 style={{
                                    fontFamily: 'Avenir 85 Heavy',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    height: '20px',
                                }}>Address</h3>
                                <h3 style={{
                                    fontFamily: 'Avenir 85 Heavy',
                                    fontWeight: '500',
                                    fontSize: '12px',
                                    height: '16px',
                                    color: '#8A8C90'
                                }}>
                                    Address
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="p-2" style={{
                        width: '40%',
                        margin: '20px'
                    }}>
                        <img src={Dokter} alt='' style={{
                            width: '280px',
                            height: '345px',
                            marginTop: '70px'
                        }}></img>
                        <Button style={{
                            width: '100%',
                            marginTop: '20px',
                            backgroundColor: '#FF6185',
                        }}>Change Photo Profile</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileDr;