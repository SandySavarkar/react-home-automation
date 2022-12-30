import React, { Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import './App.css';
import Loader from './custom/Loader';
import { getAdminLoginCredentials, logOutAdmin } from './redux/actions';
import Routing from './router/Routing';
import { decodeToken, isTokenActivated } from './utils/functions';
import { clearStorage, getDataFromLocal } from './utils/localstorage';

const App = ( {...props} ) => {

  const token = getDataFromLocal('token')
  const dispatch = useDispatch()


  useEffect(() => {
    const isTokenActive = isTokenActivated(token)
    const decodedToken = decodeToken(token)

    if( !isTokenActive ){
      clearStorage()
      dispatch(logOutAdmin({}))
    }else {
      dispatch(getAdminLoginCredentials({
        user: decodedToken,
        isLoggedIn: isTokenActive,
        token: token
      }))
    }

  },[dispatch, token])

  return (
    <Suspense fallback={<Loader/>} >
      <Routing {...props} />
    </Suspense>
  )
}

export default App;
