import { Button, Container, TextField } from '@mui/material'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAdminCredentials } from '../../api/apis'
import { getAdminLoginCredentials } from '../../redux/actions'
import { decodeToken, isTokenActivated } from '../../utils/functions'
import { setDataFromLocal } from '../../utils/localstorage'
import { loginSchema } from '../../utils/validationSchema'

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async(payload) => {
        setIsLoading(true)
        try {
            const response = await getAdminCredentials({...payload, type:'admin'})
            if(response?.data){
                const { data } = response?.data
                setDataFromLocal('token', data?.token)
                dispatch(dispatch(getAdminLoginCredentials({
                    user: decodeToken(data?.token),
                    isLoggedIn: isTokenActivated(data?.token),
                    token: data?.token
                  })))
                setIsLoading(false)
                navigate('/dashboard')
            }
        } catch (error) {
            console.log('error', error)
            setIsLoading(false)
        }
    }

  return (
    <Container maxWidth="xs" sx fixed className='login-box-container'>

      <div className='login-field-container'>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
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

              <Button disabled={isLoading} type='submit' variant="contained" color="primary" fullWidth style={{ marginTop: 15 }} >
                {isLoading ? "Please wait" : "Login"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  )
}

export default Login