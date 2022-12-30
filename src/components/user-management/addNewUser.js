import React, { useState } from 'react'
import { Button, TextField, Box, Typography, Step, StepLabel, Stepper, FormControl, InputLabel, Select, OutlinedInput, Checkbox, ListItemText, MenuItem, Grid } from '@mui/material'
import { Form, Formik } from 'formik'
import { UserSchema } from '../../utils/validationSchema';
import { Container } from '@mui/system';


const steps = ['Select campaign settings', 'Create an ad group'];

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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];


const AddNewUser = ({ ...props }) => {
  const [personName, setPersonName] = useState([]);

  const handleSubmit = (val) => {
    console.log('personName: ', personName);
    val.devices = personName
    console.log("values", val)
  }

  const handleChangeItem = (event) => {

    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

      <Grid container >
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
                    {names.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={personName.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button type='submit' variant="contained" color="primary" fullWidth style={{ marginTop: 15 }} >
                  ADD USER
                </Button>
              </Form>
            )}

          </Formik>
        </Grid>

      </Grid>
    </div>

  )
}

export default AddNewUser