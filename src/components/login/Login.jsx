import { Button, Container, TextField } from '@material-ui/core'
import { Form, Formik } from 'formik'
import React from 'react'
import { loginSchema } from '../../utils/validationSchema'

const Login = () => {
  return (
    <Container maxWidth="xs" sx fixed className='login-box-container'>

      <div className='login-field-container'>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={loginSchema}
          onSubmit={() => console.log("Done")}
        >
          {({ errors, touched, values, handleChange }) => (
            <Form>
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

              <Button type='submit' variant="contained" color="primary" fullWidth style={{ marginTop: 15 }} >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  )
}

export default Login