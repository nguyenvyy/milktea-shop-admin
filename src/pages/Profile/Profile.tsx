import React from 'react'

import './Profile.scss'
import { Header } from '../../components/common/Header/Header'
import { AccountInfo } from '../../components/ManageProfile/AccountInfo'
import { UserInfo } from '../../components/ManageProfile/UserInfo'

const Profile = () => {
    return (
        <div className="profile">
            <Header title="Profile"  />
            <div className="profile__wrapper">
                <UserInfo />
                <AccountInfo />
            </div>
        </div>
    )
}

export default Profile;