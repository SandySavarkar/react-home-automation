import React, { useEffect, useState } from 'react'
import { Button, TextField, FormControl, InputLabel, Select, OutlinedInput, Checkbox, ListItemText, MenuItem, Grid } from '@mui/material'
import { Form, Formik } from 'formik'
import { UserSchema } from '../../utils/validationSchema';
import { getAllAvailableDevices, getAllDevices, getUser, registerNewUser, updateUser } from '../../api/apis';
import { useParams } from 'react-router';


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


const EditUser = ({ ...props }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [devicesName, setDevicesName] = useState([]);
  const [personName, setPersonName] = useState([]);
  const [user, setUser] = useState();

  const { id } = useParams()

  const handleUpdateUser = async (payload) => {
    setIsLoading(true)
    try {
      const response = await updateUser(id, payload)
      if (response?.data) {
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      console.log('error', error)
    }
  }

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

  const handleSubmit = async (payload) => {
    const cloneData = { ...payload }
    cloneData['devices'] = personName
    await handleUpdateUser(cloneData)
  }

  const handleChangeItem = (event) => {
    const { target: { value } } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  useEffect(() => {
    getUserDetails();
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

  return (
    <Grid container sx={{ justifyContent: 'center' }} >
      <Grid item sm={6} xs={12} md={6} xl={6} >
        <Formik
          initialValues={{
            name: user?.name,
            email: user?.email,
            devices: personName
          }}
          // validationSchema={UserSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ errors, touched, values, handleChange }) => (
            <Form>
              <TextField
                id="name"
                name='name'
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
                placeholder="Email"
                type="email"
                variant="outlined"
                fullWidth
                disabled={true}
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
                  value={personName}
                  onChange={handleChangeItem}
                  input={<OutlinedInput label="Devices" />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {devicesName.map((data) => (
                    <MenuItem key={data?._id} value={data?._id}>
                      <Checkbox checked={personName?.indexOf(data?._id) > -1} />
                      <ListItemText primary={data?.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button type='submit' disabled={isLoading} variant="contained" color="primary" fullWidth style={{ marginTop: 15 }} >
                {isLoading ? "PLEASE WAIT" : "EDIT USER"}
              </Button>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  )
}

export default EditUser