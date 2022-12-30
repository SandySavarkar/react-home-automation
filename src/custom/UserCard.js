import React from 'react'
import { Button, CardContent, Typography, Card, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ index, id, handleView, handleDelete, ...data }) => {

    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleDeleteConfirmed = () => {
        setOpen(false)
        handleDelete(id);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Card sx={{ border: "1px solid gray" }} >
                <CardContent onClick={() => handleView(id)} >
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {data?.type} {`#${index + 1}`}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {data?.name || 'Username'}
                    </Typography>
                    <Typography color="text.secondary">
                        {data?.email || 'xyz@gmail.com'}
                    </Typography>
                    <Typography variant="body2">
                        {data?.devices?.filter(val => !val?.is_deleted)?.length ? `Total Devices: ${data?.devices?.length}` : "No devices assigned"}
                    </Typography>
                </CardContent>
                <div style={{ padding: "1rem" }} >
                    <Button onClick={() => navigate(`/edit-user/${id}`)} type='button' sx={{ marginRight: "1rem" }} variant="contained" size="small">
                        Edit
                    </Button>
                    <Button type='button' variant='outlined' size="small" onClick={handleOpen}>
                        Delete
                    </Button>
                </div>
            </Card>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirmation?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        All are sure you want to delete item ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDeleteConfirmed} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default UserCard
