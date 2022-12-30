import { Grid } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllDevices } from '../../api/apis'
import DeviceCard from '../../custom/DeviceCard'

const AllDevices = ({ ...props }) => {
    const [deviceData, setDeviceData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const getAllDevicesData = async() => {
        setIsLoading(true)
        try {
            const response = await getAllDevices()
            if(response?.data){
                setIsLoading(false)
                setDeviceData(response?.data?.data)
            }
        } catch (error) {
            setIsLoading(false)
            console.log('error', error)
        }
    }

    useEffect(() => {
        getAllDevicesData()
    },[])

    const handleView = (id) => {
        navigate(`/device/${id}`)
    }

    console.log('deviceData', deviceData)

    return (
        <Fragment>
            <div className='heading' >
                <h1>All Devices</h1>
            </div>
            {
                isLoading ? <div className='loading'>
                    <p>Loading....</p>
                </div> : <div {...props} style={{ padding: "1rem" }} >
                    <Grid container spacing={2}>
                        {
                            deviceData?.length ? <>
                                {
                                    deviceData?.map(({ _id, ...otherData }, index) => {
                                        return (
                                            <Grid sx={{cursor: "pointer"}} key={_id} item sm={6} xs={12} md={4} xl={4}>
                                                <DeviceCard {...{id: _id, index, handleView}} {...otherData} />
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

export default AllDevices