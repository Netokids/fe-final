import React from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query'
import { API } from '../config/api'
import moment from 'moment'

const Detail = () => {

    let { id } = useParams();

    let { data: ArticleDetail } = useQuery('articleDetailCache', async () => {
        const response = await API.get(`/articles/${id}`)
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
                }}>
                    {ArticleDetail?.title}
                </h1>
                <p style={{
                    fontFamily: 'Product Sans',
                    color: '#6C6C6C',
                    fontWeight: '400',
                    fontSize: '18px',
                    height: '22px',
                    marginLeft: '20px',
                }}>
                    {moment(ArticleDetail?.createdAt).format("DD MMMM YYYY")}
                </p>
                <p style={{
                    marginLeft: '20px',
                }}>
                    Author:{" "}
                    <span style={{ color: "#FF6185", }}>Dr. {ArticleDetail?.user.fullname}</span>
                </p>
                <Card style={{ width: '100%', height: '100%', marginRight: '20px', marginBottom: '30px' }}>
                    <Card.Img variant="top" src={ArticleDetail?.image} alt="" style={{
                        width: '900px',
                        alignSelf: 'center',
                        height: '500px',
                        padding: '30px'
                    }} />
                    <Card.Body style={{
                        alignSelf: 'center',
                        width: '870px',
                    }}>
                        <Card.Text style={{
                            textAlign: 'left',
                        }}>
                            {ArticleDetail?.description}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default Detail;