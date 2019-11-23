import { connect } from "react-redux";
import { RootState } from "../reducers/root-reducer";
import { Membership } from "../../pages/Membership/Membership";
import { receiveMemberships, realtimeUpdateMemberships } from "../actions/membership/actions";
const mapState = (state: RootState) => {
    
    const { membership } = state
    return {
        memberships: membership.items,
        loading: membership.loading
    }
}

const mapDispatch = {
    receiveMemberships,
    realtimeUpdateMemberships
}
export default connect(mapState, mapDispatch)(Membership)
