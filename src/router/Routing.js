import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { isAuthRoutes, isPrivateRoutes } from '.'
import NotFound from '../components/404'
import AuthLayout from '../layout/AuthLayout'
import PrivateLayout from '../layout/PrivateLayout'

const Routing = ({...props}) => {
  return (
    <Routes {...props} >
        <Route path="/" element={<AuthLayout/>} >
            {
                isAuthRoutes()?.map(({id, ...otherProps}) => <Route key={id} index {...otherProps} />)
            }
        </Route>
        <Route path="/" element={<PrivateLayout/>} >
            {
                isPrivateRoutes()?.map(({id, ...otherProps}) => <Route key={id} index {...otherProps} />)
            }
        </Route>
        <Route path='*' element={<NotFound/>} />
    </Routes>
  )
}

export default Routing