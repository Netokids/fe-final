import React from "react";
import { Card } from "react-bootstrap";
import { API } from '../config/api'
import { useQuery } from 'react-query'
import { useNavigate } from "react-router-dom";

const Article = () => {

    let navigate = useNavigate()

    let { data: article1 } = useQuery('articlesCachce', async () => {
        const response = await API.get('/articles')
        return response.data.data
    })

    return (
        <>
            <img alt="" style={{
                position: 'absolute',

            }} />

            <div style={{
                width: '100%',
                textAlign: 'center',
                marginTop: '50px',
            }}>
                <h1>Artikel Hari Ini</h1>

                <div className="d-flex align-content-around flex-wrap" style={{
                    marginLeft: '95px',
                    marginTop: '50px',
                    marginBottom: '50px'
                }}>

                    {article1?.map((item, index) => (
                        <>
                            <Card key={index} style={{ width: '290px', height: '390px', marginRight: '10px', marginTop:'30px' }}>
                                <Card.Img variant="top" style={{
                                    width:'100%',
                                    height: '200px',
                                }} src={item.image} alt="" onClick={()=>navigate(`detail/${item.id}`)} />
                                <Card.Body>
                                    <Card.Title style={{
                                        textAlign: 'left',
                                    }}>{item.title}</Card.Title>
                                    <Card.Text style={{
                                        textAlign: 'left',
                                        maxWidth: '100%',
                                    }}>
                                        {item.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </>
                    ))}


                </div>
            </div>
        </>
    );
}

export default Article