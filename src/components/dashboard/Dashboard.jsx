import React from 'react'
import { useSelector } from 'react-redux'

const Dashboard = ({...props}) => {
    const userData = useSelector(({ auth }) => auth)

    return (
        <section {...props} >
            <h1>Hello, {userData?.user?.name}</h1>
        </section>
    )
}

export default Dashboard