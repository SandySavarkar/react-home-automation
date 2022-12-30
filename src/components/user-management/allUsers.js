import { Button, Grid } from '@mui/material'
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router'
import UserCard from '../../custom/UserCard'

const AllUsers = ({ ...props }) => {

    const navigate = useNavigate();
    const handleAddUser = () => {
        navigate('/add-new-user')
    }

    return (
        <Fragment>
            <div className='heading' >
                <h1>All Users</h1>
                <Button variant="contained" onClick={handleAddUser} >Add User</Button>
            </div>
            <div {...props} style={{ padding: "1rem" }} >
                <Grid container spacing={2}>
                    <Grid item sm={6} xs={12} md={4} xl={4}>
                        <UserCard />
                    </Grid>
                    <Grid item sm={6} xs={12} md={4} xl={4}>
                        <UserCard />
                    </Grid>
                    <Grid item sm={6} xs={12} md={4} xl={4}>
                        <UserCard />
                    </Grid>
                    <Grid item sm={6} xs={12} md={4} xl={4}>
                        <UserCard />
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    )
}

export default AllUsers