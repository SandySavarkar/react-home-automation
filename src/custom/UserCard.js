import React from 'react'
import { Button, CardContent, Typography, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserCard = ({index, id, handleView, ...data}) => {

    const navigate = useNavigate()

    return (
        <Card sx={{border: "1px solid gray"}} >
            <CardContent onClick={() => handleView(id)} >
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {data?.type} {`#${index+1}`}
                </Typography>
                <Typography variant="h5" component="div">
                    {data?.name || 'Username'}
                </Typography>
                <Typography color="text.secondary">
                    {data?.email || 'xyz@gmail.com'}
                </Typography>
                <Typography variant="body2">
                    {data?.devices?.length ? `Total Devices: ${data?.devices?.length}` : "No available device"}
                </Typography>
            </CardContent>
            <div style={{padding: "1rem"}} >
                <Button onClick={() => navigate(`/edit-user/${id}`)} type='button' sx={{marginRight: "1rem"}} variant="contained" size="small">
                    Edit
                </Button>
                <Button type='button' variant='outlined' size="small">
                    Delete
                </Button>
            </div>
        </Card>
    );
}

export default UserCard
