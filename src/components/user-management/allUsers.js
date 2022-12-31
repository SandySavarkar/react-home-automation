import { Button, Grid } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteUser, getAllUsers } from '../../api/apis'
import UserCard from '../../custom/UserCard'
import { getAllUsersAction } from '../../redux/actions'

const AllUsers = ({ ...props }) => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    const getUsers = async () => {
        setIsLoading(true)
        try {
            const response = await getAllUsers()
            if (response?.data) {
                setIsLoading(false)
                const filteredData = response?.data?.data?.filter((item) => !item.is_deleted)
                setUsers(filteredData)
                dispatch(getAllUsersAction(filteredData))
            }
        } catch (error) {
            console.log('error', error)
            setIsLoading(false)
        }
    }

    const deleteUserData = async (id) => {
        setIsLoading(true)
        try {
            await deleteUser(id)
            setIsLoading(false)
            getUsers()
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
        // eslint-disable-next-line
    }, [])

    console.log('users', users)

    const handleView = (id) => {
        navigate(`/user-details/${id}`)
    }

    const handleDelete = (id) => {
        deleteUserData(id)
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
                                            <Grid sx={{ cursor: "pointer" }} key={_id} item sm={6} xs={12} md={4} xl={4}>
                                                <UserCard {...{ id: _id, index, handleView, handleDelete }}  {...otherData} />
                                            </Grid>
                                        )
                                    })
                                }
                            </> : <div className='loading'>
                                <p style={{paddingLeft: "1.25rem"}}>No data found</p>
                            </div>
                        }
                    </Grid>
                </div>
            }

        </Fragment>
    )
}

export default AllUsers