import React from 'react'
import { Route } from 'react-router-dom'

import './Membership.scss'
import { Header } from '../../components/common/Header/Header'
import { membershipPath } from '../../config/route-config'
import { MembershipDetailModal } from '../../components/ManageMembership/MembershipDetailModal'
import MembershipList from '../../redux/container/Membership'
const Membership = () => {
    return (
        <div className="membership">
            <Header title="Membership" />
            <div className="membership__list">
                <MembershipList />
            </div>
            <Route path={`${membershipPath}/detail/:id`} exact component={MembershipDetailModal} />
        </div>
    )
}

export default Membership