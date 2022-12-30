import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Topbar from '../components/topbar/Topbar'
import withAdmin from '../hoc/withAdmin'

const PrivateLayout = ({isLoggedIn, ...props}) => {
  return (
    <section className='admin_layout' >
        <Topbar {...{isLoggedIn}} />
        <WithAdmin replace {...{to: '/'}} {...props} />
    </section>
  )
}

export default PrivateLayout

const WithAdmin = withAdmin(Outlet, Navigate)