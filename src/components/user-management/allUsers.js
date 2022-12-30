import { Button, Grid } from '@mui/material'
import React, { Fragment } from 'react'
import UserCard from '../../custom/UserCard'

const AllUsers = ({ ...props }) => {
    return (
        <Fragment>
            <div className='heading' >
                <h1>All Users</h1>
                <Button variant="contained" >Add User</Button>
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