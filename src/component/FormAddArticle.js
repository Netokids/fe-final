import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useMutation } from "react-query";
import { API } from "../config/api";
import '../style/formaddtrip.css';
import { useNavigate} from "react-router-dom";

const FormArticle = () => {
    let navigate = useNavigate();
    const [form, setForm] = useState({
        title: '',
        image: '',
        description: ''
    })

    console.log(form);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value
        })
    }

    const handleSubmitArticle = useMutation(async (e) => {
        e.preventDefault();
        try{
            
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }

            const formData = new FormData();
            formData.append('title', form.title);
            formData.append('image', form.image[0]);
            formData.append('description', form.description);

            const response = await API.post('/articles', formData, config);
            alert('Article Added');
            navigate('/')
        } catch(error){
            console.log(error);
        }
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
                }}>Add Article</h2>
                <Form className='form-add-trip' onSubmit={(e) => handleSubmitArticle.mutate(e)}>
                    <Form.Group className="form-group" >
                        <Form.Label>Title</Form.Label>
                        <Form.Control className="form-input" type="text" name="title" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control type="file" name="image" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="form-group" >
                        <Form.Label>Description</Form.Label>
                        <FloatingLabel controlId="floatingTextarea2">
                            <Form.Control as="textarea" className="form-input" style={{ height: '100px' }} name="description" onChange={handleChange} />
                        </FloatingLabel>
                    </Form.Group>

                    <Button type="submit" className='button-add-trip' style={{
                        backkgroundColor: '#FF6185',
                    }}>Post</Button>
                </Form>
            </div>
        </>
    )
}

export default FormArticle;