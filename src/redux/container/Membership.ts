import { connect } from "react-redux";
import { RootState } from "../reducers/root-reducer";
import { realtimeUpdateMemberships } from "../actions/membership/actions";
import { MembershipList } from "../../components/ManageMembership/MembershipList";
const mapState = (state: RootState) => {
    
    const { membership } = state
    return {
        memberships: membership.items,
        loading: membership.loading,
    }
}

const mapDispatch = {
    realtimeUpdateMemberships,
}
export default connect(mapState, mapDispatch)(MembershipList)
