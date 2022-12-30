import { Grid } from '@mui/material'
import React from 'react'
import UserCard from '../../custom/UserCard'

const AllDevices = ({ ...props }) => {
    return (
        <div {...props} style={{padding: "1rem"}} >
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
    )
}

export default AllDevices