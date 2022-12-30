import { isTokenActivated } from "../utils/functions"
import { getDataFromLocal } from "../utils/localstorage"


const withAdmin = (RenderComponent, NavigateComponent) => ({to, replace, ...props}) => {
    const token = getDataFromLocal('token')
    return isTokenActivated(token) ? <RenderComponent {...props} /> : <NavigateComponent {...{to, replace}} />
}

export default withAdmin