import React, { useEffect, useState } from 'react'
import { Button, Grid, TextField } from '@mui/material'
import { Form, Formik } from 'formik'
import { EditDeviceSchema } from '../../utils/validationSchema'
import { useParams } from 'react-router-dom'
import { getParticularDevide, updateDeviceName } from '../../api/apis'
import { modifyLimit, modifyPinsConfig, modifyWatt } from '../../utils/functions'

const EditDevice = ({ ...props }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [deviceConfig, setDeviceConfig] = useState({})
    const [manualConfig, setManualConfig] = useState({
        watt_config: {},
        limit_config: {}
    })
    const { id } = useParams()

    const getDeviceDetails = async (id) => {
        setIsLoading(true)
        try {

            const response = await getParticularDevide(id)
            if (response?.data) {
                setDeviceConfig(response?.data?.data)
                setManualConfig({
                    watt_config: modifyWatt(response?.data?.data?.pins),
                    limit_config: modifyLimit(response?.data?.data?.pins)
                })
                setIsLoading(false)
            }

        } catch (error) {
            setIsLoading(false)
            console.log('error', error)
        }
    }

    console.log('manualConfig', manualConfig)

    useEffect(() => {
        id && getDeviceDetails(id)
    }, [id])

    const handleSubmit = async (payload) => {
        const cloneData = { ...payload }
        cloneData['pins'] = modifyPinsConfig(deviceConfig?.pins, manualConfig)
        setIsLoading(true)
        try {
            const response = await updateDeviceName(cloneData)
            if (response?.data) {
                setDeviceConfig(response?.data?.data)
                setIsLoading(false)
            }
        } catch (error) {
            console.log('error', error)
            setIsLoading(false)
        }
    }

    const handlePinConfig = (e, key) => {
        const { name, value } = e.target
        setManualConfig({
            ...manualConfig, [key]: {
                ...manualConfig[key], [name]: value
            }
        })
    }

    return (
        <div {...props} >
            <Grid container sx={{ justifyContent: 'center' }} >
                {isLoading ? <div className='loading' >
                    <p>Please wait</p>
                </div> : <Grid item sm={6} xs={12} md={6} xl={6} >

                    <Formik
                        initialValues={{
                            serial_number: deviceConfig.serial_number,
                            name: deviceConfig.name
                        }}
                        validationSchema={EditDeviceSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, values, handleChange }) => (
                            <Form>
                                <TextField
                                    id="serial_number"
                                    name='serial_number'
                                    label="Serial Number"
                                    type="name"
                                    variant="outlined"
                                    fullWidth
                                    disabled
                                    value={values.serial_number}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                                <TextField
                                    id="name"
                                    name='name'
                                    label="Device Name"
                                    type="name"
                                    variant="outlined"
                                    fullWidth
                                    value={values.name}
                                    onChange={handleChange}
                                    error={touched.name && Boolean(errors.name)}
                                    helperText={touched.name && errors.name}
                                    margin="normal"
                                />
                                <div >
                                <h5>Pins Configurations</h5>
                                    {
                                        deviceConfig?.pins?.map((data, index) => {
                                            return (
                                                <div key={data?.pinId} style={{ display: 'flex', flexDirection: 'row',gap: 5 }}>
                                                    <TextField
                                                        id="pinName"
                                                        disabled
                                                        name={`pinName_${index + 1}`}
                                                        label="Pin Name"
                                                        type="name"
                                                        variant="outlined"
                                                        fullWidth
                                                        value={data?.pinName}
                                                        onChange={(e) => handlePinConfig(e)}
                                                        margin="normal"
                                                    />
                                                    <TextField
                                                        id="watt"
                                                        name={index}
                                                        label="Pin Watt"
                                                        type="number"
                                                        variant="outlined"
                                                        fullWidth
                                                        value={manualConfig['watt_config'][index]}
                                                        onChange={(e) => handlePinConfig(e, 'watt_config')}
                                                        margin="normal"
                                                        InputProps={{ inputProps: { min: 0, step: 'any'} }}
                                                    />
                                                    <TextField
                                                        id="watt"
                                                        name={index}
                                                        label="Pin Limit"
                                                        type="number"
                                                        step='any'
                                                        variant="outlined"
                                                        fullWidth
                                                        value={manualConfig['limit_config'][index]}
                                                        onChange={(e) => handlePinConfig(e, 'limit_config')}
                                                        margin="normal"
                                                        InputProps={{ inputProps: { min: 0,step: 'any'} }}

                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <Button type='submit' disabled={isLoading} variant="contained" color="primary" fullWidth style={{ marginTop: 15 }} >
                                    {isLoading ? "Please wait" : "Update"}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Grid>}
            </Grid>
        </div>
    )
}

export default EditDevice