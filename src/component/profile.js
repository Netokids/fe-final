import React from "react";
import { Button, Form } from "react-bootstrap";
import Name from "../assets/image/name.png";
import Mail from "../assets/image/office.png";
import Status from "../assets/image/status.png";
import Gender from "../assets/image/gender.png";
import Phone from "../assets/image/phone.png";
import Place from "../assets/image/place.png";
import Image from "../assets/image/saya.png";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { useParams } from 'react-router-dom';
import { useState } from "react";
import { useMutation } from "react-query";

const Profile = () => {

    const { id } = useParams();

    let { data: Profile, refetch: refetchProfile } = useQuery('ProfileCache', async () => {
        const response = await API.get('/users');
        return response.data.data;
    })

    const [form, setForm] = useState({
        image: ''
    })
    const handleSubmitImage = useMutation(async (e) => {
        try {
            // form data
            let formData = new FormData();
            formData.append("image", e.target.files[0]);

            // patch
            let response = await API.patch(`/users/${id}`, formData, {
                headers: {
                    "Content-type": "multipart/form-data",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            console.log(response)
            if (response.status === 200) {
                refetchProfile()
            }

        } catch (err) {
            console.log(err);
        }
    });

    return (
        <>

            <div style={{
                width: '785px',
                height: '453px',
                margin: 'auto',
                marginTop: '50px',
                marginBottom: '50px'
            }}>
                {Profile?.map((item, index) => {
                    if (item?.id == id) {
                        return (<>
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


                                    <div className="d-flex" key={index} style={{
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
                                            }}>{item?.fullname}</h3>
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
                                            }}>{item?.email}</h3>
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
                                            }}>{item?.role}</h3>
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
                                            }}>{item?.gender}</h3>
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
                                            }}>{item?.phone}</h3>
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
                                            }}>{item?.address}</h3>
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
                                    <img src={item?.image} alt='' style={{
                                        width: '280px',
                                        height: '345px',
                                        marginTop: '70px'
                                    }}></img>
                                    <Form.Control
                                        type="file"
                                        id="image"
                                        className="form-input input-image"
                                        name="image"
                                        onChange={handleSubmitImage.mutate}
                                    />
                                    <Button onClick={() => {
                                        document.getElementById("image").click();
                                    }} style={{
                                        width: '100%',
                                        marginTop: '20px',
                                        backgroundColor: '#FF6185',
                                        marginTop: '-70px',
                                    }}>Change Photo Profile</Button>
                                </div>
                            </div>
                        </>
                        )
                    }
                }
                )}


            </div>
        </>
    )
}

export default Profile;