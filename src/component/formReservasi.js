import React from "react";
import { Table } from "react-bootstrap";
import Search from "../assets/image/search.png";
import { useState } from "react";
import { API } from "../config/api";
import { useQuery } from "react-query";
import moment from 'moment';
import ModalReservation from "./detailreservasi";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext } from "react";

const FormReservasi = () => {
    let { id } = useParams();
    const [state] = useContext(UserContext);
    let { data: Reservasi } = useQuery('ReservasiCache', async () => {
        const response = await API.get('/consultations');
        return response.data.data;
    }
    )

    const [show, setShow] = useState(false);
    const [value, setValue] = useState();
    const [reservasiId, setReservasiId] = useState();


    return (
        <div style={{
            width: '80%',
            margin: 'auto',
        }}>
            <ModalReservation show={show} setShow={setShow} value={value} reservasiId={reservasiId} />
            <h2 style={{
                fontFamily: 'Product Sans',
                fontWeight: '700',
                fontSize: '48px',
                marginLeft: '30px',
                marginTop: '40px',
                marginBottom: '40px',
                color: '#FF6185'
            }}>Reservasi Data</h2>
            <Table striped>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Patient</th>
                        <th>Subject</th>
                        <th>Date of Complaint</th>
                        <th>Status</th>
                        <th>action</th>
                    </tr>
                </thead>
                {Reservasi?.map((item, index) => {
                    if (item.doctor.id == id) {
                        return (
                            <>
                                <tbody key={index}>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.user.fullname}</td>
                                        <td>{item.subject}</td>
                                        <td>{moment(item.created_at).format("DD MMMM YYYY")}</td>
                                        <td>
                                            {item.status == "Waiting Approve Consultation"
                                                ? <p className="text-warning">Waiting Approve Consultation</p>
                                                : item.status == "Waiting Live Consultation"
                                                    ? <p className="text-success">Waiting Live Consultation</p>
                                                    : <p className="text-danger">Cancel</p>
                                            }
                                        </td>
                                        <td><img src={Search} alt="" onClick={() => { setReservasiId(item.id); setShow(true); setValue(item) }}></img></td>
                                    </tr>
                                </tbody>
                            </>
                        )
                    }
                })}
            </Table>
        </div>

    )
}

export default FormReservasi

