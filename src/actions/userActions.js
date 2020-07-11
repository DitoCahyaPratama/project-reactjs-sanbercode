const setUser = (user) => {
    return{
        type: 'SET_USER',
        payload: {
            currentUser: user
        }
    }   
}

const clearUser = () => {
    return {
        type: 'CLEAR_USER'
    }
}

export default{
    setUser,
    clearUser
}