import { Checkbox, FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getAllDevices, getUser } from '../../api/apis';
import DeviceCard from '../../custom/DeviceCard';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const UserDetails = ({ ...props }) => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [devicesName, setDevicesName] = useState([]);
    const [personName, setPersonName] = useState([]);
    const [user, setUser] = useState();

    const { id } = useParams()

    const getUserDetails = async () => {
        try {
            const response = await getUser(id)
            if (response?.data) {
                setUser(response?.data?.data)
                setPersonName(response?.data?.data?.devices?.map(val => val?._id))
            }
        } catch (error) {
            console.log('error', error)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getUserDetails();
        // eslint-disable-next-line
    }, [])

    const getAllAvailablesDevices = async () => {
        try {
            const response = await getAllDevices()
            if (response?.data) {
                setDevicesName(response?.data?.data)
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(() => {
        getAllAvailablesDevices()
    }, [])

    const handleView = (id) => {
        navigate(`/device/${id}`)
    }

    return (
        <Grid container sx={{ justifyContent: 'center' }} >
            {isLoading ? <div className='loading' >
                <p>Please wait</p>
            </div> : <Grid item sm={6} xs={12} md={6} xl={6} >
                <Formik
                    initialValues={{
                        name: user?.name,
                        email: user?.email,
                        devices: personName
                    }}
                    // validationSchema={UserSchema}
                    onSubmit={(payload) => console.log(payload)}
                    enableReinitialize
                >
                    {({ errors, touched, values, handleChange }) => (
                        <Form>
                            <TextField
                                id="name"
                                name='name'
                                disabled
                                placeholder="Name"
                                type="name"
                                variant="outlined"
                                fullWidth
                                value={values.name}
                                onChange={handleChange}
                                error={touched.name && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                margin="normal"
                            />
                            <TextField
                                id="email"
                                name='email'
                                disabled
                                placeholder="Email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                value={values.email}
                                onChange={handleChange}
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                margin="normal"
                            />
                            <FormControl sx={{ width: '100%', marginTop: 1 }}>
                                <InputLabel id="demo-multiple-checkbox-label">Devices</InputLabel>
                                <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    name="devices"
                                    multiple
                                    disabled
                                    value={personName}
                                    input={<OutlinedInput label="Devices" />}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                >
                                    {devicesName?.map((data) => (
                                        <MenuItem key={data?._id} value={data?._id}>
                                            <Checkbox checked={personName?.indexOf(data?._id) > -1} />
                                            <ListItemText primary={data?.name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Form>
                    )}
                </Formik>
                <div>
                    <p>Users's Devices</p>
                    <Grid container spacing={2}>
                        {
                            user?.devices?.length ? <>
                                {
                                    user?.devices?.map(({ _id, ...otherData }, index) => {
                                        return (
                                            <Grid sx={{cursor: "pointer"}} key={_id} item sm={6} xs={12} md={4} xl={4}>
                                                <DeviceCard {...{id: _id, index, handleView, isHide: true}} {...otherData} />
                                            </Grid>
                                        )
                                    })
                                }
                            </> : <div className='loading'>
                                <p style={{paddingLeft: "1.25rem"}} >No device assigned</p>
                            </div>
                        }
                    </Grid>
                </div>
            </Grid>}
        </Grid>
    )
}

export default UserDetails