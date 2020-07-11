const initialUserState = {
    currentUser: null,
    isLoading: true
}
const currentUser = (state = initialUserState, action) => {
    switch(action.type){
        case 'SET_USER':
            return{
                currentUser: action.payload.currentUser,
                isLoading: false
            }
        case 'CLEAR_USER':
            return{
                ...initialUserState,
                isLoading: false
            }
        default:
            return state
    }
}

export default currentUser