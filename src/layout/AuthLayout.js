import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import withAuth from '../hoc/withAuth'

const AuthLayout = ({isLoggedIn, ...props}) => {
  return <WithAuth replace {...{to: '/dashboard'}} {...props} />
}

export default AuthLayout

const WithAuth = withAuth(Outlet, Navigate)