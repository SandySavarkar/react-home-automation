import React from 'react'
import { Button, CardContent, Typography, CardActions, Card } from '@mui/material';

const UserCard = ({index, ...data}) => {
    return (
        <Card sx={{border: "1px solid gray"}} >
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    User {`#${index}`}
                </Typography>
                <Typography variant="h5" component="div">
                    {data?.name || 'Username'}
                </Typography>
                <Typography color="text.secondary">
                    {data?.email || 'xyz@gmail.com'}
                </Typography>
                <Typography variant="body2">
                    Devices list
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" size="small">
                    Edit
                </Button>
                <Button variant='outlined' size="small">
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}

export default UserCard
