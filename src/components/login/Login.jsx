import { Box, Button, Container, CssBaseline, TextField } from '@mui/material'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAdminCredentials } from '../../api/apis'
import { getAdminLoginCredentials } from '../../redux/actions'
import { decodeToken, isTokenActivated } from '../../utils/functions'
import { setDataFromLocal } from '../../utils/localstorage'
import { loginSchema } from '../../utils/validationSchema'
import logo from '../../assests/logo.png'

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (payload) => {
        setIsLoading(true)
        try {
            const response = await getAdminCredentials({ ...payload, type: 'admin' })
            if (response?.data) {
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
            <Container component="main" maxWidth="xs" className='login-container'> 
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                        <img src={logo} alt='not avialable' style={{width: "200px",objectFit: 'contain'}}/>
                    
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
                                    placeholder="Email"
                                    type="email"
                                    variant="outlined"
                                    fullWidth
                                    value={values.email}
                                    onChange={handleChange}
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                                <TextField
                                    id="password"
                                    name='password'
                                    placeholder="Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    value={values.password}
                                    onChange={handleChange}
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    margin="normal"
                                />

                                <Button disabled={isLoading} type='submit' variant="contained" color="primary" fullWidth style={{ marginTop: 15,marginBottom: 50 }} >
                                    {isLoading ? "Please wait" : "Login"}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Container>
    )
}

export default Login