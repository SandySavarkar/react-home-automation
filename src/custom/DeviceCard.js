import React from 'react'
import { Button, CardContent, Typography, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DeviceCard = ({index, id, handleView, ...data}) => {

    const navigate = useNavigate()

    return (
        <Card sx={{border: "1px solid gray"}} >
            <CardContent onClick={() => handleView(id)} >
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    device {`#${index+1}`}
                </Typography>
                <Typography variant="h5" component="div">
                    {data?.name || 'devicename'}
                </Typography>
                <Typography color="text.secondary">
                   serial no. {data?.serial_number}
                </Typography>
                <Typography variant="body2">
                    Total Pins : {data?.pins?.length}
                </Typography>
            </CardContent>
            <div style={{padding: "1rem"}} >
                <Button onClick={() => navigate(`/edit-device/${id}`)} type='button' sx={{marginRight: "1rem"}} variant="contained" size="small">
                    Edit
                </Button>
                <Button type='button' variant='outlined' size="small">
                    Delete
                </Button>
            </div>
        </Card>
    );
}

export default DeviceCard
