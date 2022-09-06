import {createContext, useEffect, useState} from 'react'

const GlobalContext = createContext()


export const GlobalProvider = ({children}) => {

    // useEffect(() => {
    //     console.log(process.env.REACT_APP_TEST)
    //     console.log(process.env.NODE_ENV)
    // }, [])

    const GLOBAL_API_URL = ((process.env.NODE_ENV === 'production') ? '' : 'http://localhost:5000')

    const [loggedInUserData, setLoggedInUserData] = useState({
        name: '',
        email: '',
    })

    useEffect(() => {
        updateLoggedInUserData()
    }, [])

    const updateLoggedInUserData = () => {
        const userToken = localStorage.getItem('user')
        if(userToken){
            fetch(GLOBAL_API_URL + '/api/users/me', {
                method: 'GET',
                headers: {
                    'authorization': 'Bearer ' + userToken
                }
            })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                } else {
                    setLoggedInUserData({
                        name: data.name,
                        email: data.email,
                    })
                }
            })
            .catch((error) => {
                console.log(error)
            })
        } else {
            setLoggedInUserData({
                name: '',
                email: '',
            })
        }
    }


    return <GlobalContext.Provider value={{ 
        GLOBAL_API_URL,
        loggedInUserData,
        updateLoggedInUserData
    }}>
        {children}
    </GlobalContext.Provider>
}

export default GlobalContext