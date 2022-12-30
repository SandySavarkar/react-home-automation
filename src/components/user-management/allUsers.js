import { Button, Grid } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllUsers } from '../../api/apis'
import UserCard from '../../custom/UserCard'

const AllUsers = ({ ...props }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    const getUsers = async () => {
        setIsLoading(true)
        try {
            const response = await getAllUsers()
            if (response?.data) {
                setIsLoading(false)
                setUsers(response?.data?.data)
            }
        } catch (error) {
            console.log('error', error)
            setIsLoading(false)
        }
    }

    const handleAddUser = () => {
        navigate('/add-new-user')
    }

    useEffect(() => {
        getUsers()
    }, [])

    console.log('users', users)

    const handleView = (id) => {
        navigate(`/device/${id}`)
    }

    return (
        <Fragment>
            <div className='heading' >
                <h1>All Users</h1>
                <Button variant="contained" onClick={handleAddUser} >Add User</Button>
            </div>
            {
                isLoading ? <div className='loading'>
                    <p>Loading....</p>
                </div> : <div {...props} style={{ padding: "1rem" }} >
                    <Grid container spacing={2}>
                        {
                            users?.length ? <>
                                {
                                    users?.map(({ _id, ...otherData }, index) => {
                                        return (
                                            <Grid sx={{cursor: "pointer"}} key={_id} item sm={6} xs={12} md={4} xl={4}>
                                                <UserCard {...{id: _id, index, handleView}} {...otherData} />
                                            </Grid>
                                        )
                                    })
                                }
                            </> : <div className='loading'>
                                <p>No data found</p>
                            </div>
                        }
                    </Grid>
                </div>
            }
        </Fragment>
    )
}

export default AllUsers