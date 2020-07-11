import React from 'react'
import firebase from '../config/firebase'
import { notification } from 'antd'

function Dashboard() {
    const handleSignOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                notification.success({
                    message: 'Noted',
                    description: "You're successfully logout. Nice Day !",
                });          
            })
    }
    return (
        <div>
            <button onClick={() => handleSignOut()}>Logout</button>    
        </div>
    )
}

export default Dashboard