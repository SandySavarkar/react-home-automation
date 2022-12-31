import { Button, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Form, Formik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { getParticularDevide } from '../../api/apis'
import { EditDeviceSchema } from '../../utils/validationSchema'
import { modifyLimit, modifyWatt } from '../../utils/functions'

const DeviceDetails = ({ ...props }) => {
    const navigate = useNavigate()
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
                        onSubmit={(payload) => console.log(payload)}
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
                                    margin="normal"
                                />
                                <TextField
                                    id="name"
                                    name='name'
                                    disabled
                                    label="Device Name"
                                    type="name"
                                    variant="outlined"
                                    fullWidth
                                    value={values.name}
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
                                                        margin="normal"
                                                    />
                                                    <TextField
                                                        disabled
                                                        id="watt"
                                                        name={index}
                                                        label="Pin Watt"
                                                        type="number"
                                                        variant="outlined"
                                                        fullWidth
                                                        value={manualConfig['watt_config'][index]}
                                                        margin="normal"
                                                        InputProps={{ inputProps: { min: 0} }}
                                                    />
                                                    <TextField
                                                        id="watt"
                                                        disabled
                                                        name={index}
                                                        label="Pin Limit"
                                                        type="number"
                                                        variant="outlined"
                                                        fullWidth
                                                        value={manualConfig['limit_config'][index]}
                                                        margin="normal"
                                                        InputProps={{ inputProps: { min: 0} }}

                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <Button onClick={() => navigate('/all-devices')} sx={{float: "right"}} variant="contained" >Back</Button>
                </Grid>}
            </Grid>
        </div>
    )
}

export default DeviceDetails