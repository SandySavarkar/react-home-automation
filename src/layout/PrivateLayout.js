import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import DrawerAppBar from '../components/AppDrawer'
import withAdmin from '../hoc/withAdmin'

const PrivateLayout = ({isLoggedIn, ...props}) => {
  return (
    <section className='admin_layout' >
        <DrawerAppBar>
            <WithAdmin replace {...{to: '/'}} {...props} />
        </DrawerAppBar>
    </section>
  )
}

export default PrivateLayout

const WithAdmin = withAdmin(Outlet, Navigate)