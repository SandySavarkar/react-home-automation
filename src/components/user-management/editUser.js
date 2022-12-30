import React, { useState } from 'react'
import { Button, TextField, FormControl, InputLabel, Select, OutlinedInput, Checkbox, ListItemText, MenuItem, Grid } from '@mui/material'
import { Form, Formik } from 'formik'
import { UserSchema } from '../../utils/validationSchema';
import { registerNewUser } from '../../api/apis';


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

  const handleSubmitUser = async (payload) => {
    setIsLoading(true)
    try {
      const response = await registerNewUser(payload)
      if (response?.data) {
        console.log('response?.data', response?.data)
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      console.log('error', error)
    }
  }

  const handleSubmit = async (payload) => {
    const cloneData = { ...payload }
    cloneData['devices'] = personName
    await handleSubmitUser(cloneData)
  }

  const handleChangeItem = (event) => {
    const { target: { value } } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Grid container sx={{ justifyContent: 'center' }} >
      <Grid item sm={6} xs={12} md={6} xl={6} >
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            devices: []
          }}
          validationSchema={UserSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, handleChange }) => (
            <Form>
              <TextField
                id="name"
                name='name'
                label="Name"
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
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                margin="normal"
              />
              <TextField
                id="password"
                name='password'
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
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
                      <Checkbox checked={personName.indexOf(data?._id) > -1} />
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